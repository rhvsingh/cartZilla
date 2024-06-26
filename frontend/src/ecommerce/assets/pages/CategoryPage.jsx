import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import * as DOMPurify from "dompurify"
import axios from "axios"

import { config } from "../../utils/Constants"
import SEO from "../components/SEO"

import "./productShow.css"

const ProductCardSkeleton = React.lazy(() => import("../components/product/ProductCardSkeleton"))
const ProductCards = React.lazy(() => import("../components/product/ProductCards"))

const CategoryPage = ({ isAuth }) => {
    const { catName } = useParams()
    const cleanCatName = DOMPurify.sanitize(catName, { USE_PROFILES: { html: false } })
    const [catDetails, setCatDetails] = useState({})
    const [productsData, setProductsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let baseURL = config.url.API_URL
        axios.get(baseURL + "catProduct/" + cleanCatName).then((response) => {
            if (response.data.req === 2 && response.data.status === 200) {
                setCatDetails(response.data.catData)
                setProductsData(response.data.result)
            } else if (response.data.req === 1) {
                console.log("Category not exits with this name")
            } else if (response.data.req === 3) {
                setCatDetails(response.data.catData)
                console.log("Category has no products")
            }
            setIsLoading(false)
        })
    }, [cleanCatName, isAuth])

    return (
        <>
            <SEO
                title={`${cleanCatName} | CartZilla`}
                keywords={catDetails.catKeyword}
                description={catDetails.catDesc}
            />

            {isLoading === false && productsData.length === 0 ? (
                <div className="mx-1 mt-1" style={{ fontSize: "0.75rem" }}>
                    <Link
                        to={".."}
                        relative="route"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Home
                    </Link>
                    <span className="fw-5">&gt;{cleanCatName}</span>
                    <div className="mx-2 my-2">No Products found in this category</div>
                </div>
            ) : (
                <div className="mx-1 mt-1" style={{ fontSize: "0.75rem" }}>
                    <Link
                        to={".."}
                        relative="route"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Home
                    </Link>
                    <span className="fw-5">&gt;{cleanCatName}</span>
                </div>
            )}
            <div className="products">
                {isLoading && (
                    <ProductCardSkeleton cards={productsData.length ? productsData.length : 4} />
                )}
                {productsData &&
                    productsData.length > 0 &&
                    productsData.map((product) => {
                        return (
                            <ProductCards
                                pageLink={true}
                                proURL={"../" + cleanCatName + "/" + product.pid}
                                path={true}
                                key={product.pid}
                                product={product}
                            />
                        )
                    })}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default CategoryPage

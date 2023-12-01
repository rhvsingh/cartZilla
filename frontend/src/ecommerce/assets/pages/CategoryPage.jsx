import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { ToastContainer, toast } from "react-toastify"
import * as DOMPurify from "dompurify"
import axios from "axios"

import { config } from "../../utils/Constants"
import ProductCardSkeleton from "../components/product/ProductCardSkeleton"
import ProductCards from "../components/product/ProductCards"

import "./productShow.css"

const CategoryPage = ({ isAuth }) => {
    let baseURL = config.url.API_URL

    const { catName } = useParams()
    const cleanCatName = DOMPurify.sanitize(catName, { USE_PROFILES: { html: false } })
    const [catDetails, setCatDetails] = useState({})
    const [productsData, setProductsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function addToCart(pid) {
        let apiURL = baseURL + "addCart/" + localStorage.getItem("akey")
        axios
            .post(apiURL, {
                pid: pid,
                qty: 1,
            })
            .then((response) => {
                if (response.data.result) {
                    toast.info("🦄 Product added to Cart")
                }
            })
    }

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

    console.log(catDetails)

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{cleanCatName} | CartZilla</title>
                    {catDetails && (
                        <>
                            <meta name="keywords" content={catDetails.catKeyword} />
                            <meta name="description" content={catDetails.catDesc} />
                        </>
                    )}
                </Helmet>
            </HelmetProvider>
            {isLoading === false && productsData.length === 0 ? (
                <div className="mx-2 mt-1">
                    Category<span className="num">&gt;</span>
                    <span className="num">{cleanCatName}</span>
                    <div className="mx-2 my-2">No Products found in this category</div>
                </div>
            ) : (
                <div className="mx-2 mt-1">
                    Category<span className="num">&gt;</span>
                    <span className="num">{cleanCatName}</span>
                </div>
            )}
            <div className="products">
                {isLoading && <ProductCardSkeleton cards={4} />}
                {productsData &&
                    productsData.length > 0 &&
                    productsData.map((product) => {
                        return (
                            <ProductCards
                                key={product.pid}
                                product={product}
                                isAuth={isAuth}
                                cartAdder={addToCart}
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
                theme="light"
            />
        </>
    )
}

export default CategoryPage

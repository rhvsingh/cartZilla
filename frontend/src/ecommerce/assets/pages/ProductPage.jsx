import React, { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import * as DOMPurify from "dompurify"
import axios from "axios"

import { config } from "../../utils/Constants"
import { addToCart } from "../../utils/productAddFunction"
import SplitLayout from "../layouts/SplitLayout"

import ProductImagePreview from "../components/product/ProductImagePreview"
import ProductSimilarCat from "../components/product/ProductSimilarCat"

import "./productShow.css"
import ProductDetailsShow from "../components/product/ProductDetailsShow"

const ProductPage = ({ isAuth }) => {
    const { catName, proName } = useParams()
    const navigate = useNavigate()

    const cleanCatName = DOMPurify.sanitize(catName, { USE_PROFILES: { html: false } })
    const cleanProName = DOMPurify.sanitize(proName, { USE_PROFILES: { html: false } })

    const [productsData, setProductsData] = useState([])
    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let similarShow = useRef(true)

    useEffect(() => {
        let baseURL = config.url.API_URL
        axios
            .get(baseURL + "productDetails/" + cleanCatName + "/" + cleanProName)
            .then((response) => {
                if (response.data.req === 2 && response.data.status === 200) {
                    setProductData(response.data.result)
                } else if (response.data.req === 1) {
                    console.log("Category not exits with this name")
                } else if (response.data.req === 3) {
                    console.log("Category has no products")
                }
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Server Error:", error.response.status)
                } else if (error.request) {
                    console.error("Network Error:", error.request)
                } else {
                    console.error("Error:", error.message)
                }
            })

        axios.get(baseURL + "catProduct/" + cleanCatName).then((response) => {
            if (response.data.req === 2 && response.data.status === 200) {
                setProductsData(response.data.result)
            } else if (response.data.req === 1) {
                console.log("Category not exits with this name")
            } else if (response.data.req === 3) {
                console.log("Category has no products")
            }
            similarShow.current = false
        })
    }, [cleanCatName, cleanProName, isAuth])

    function toLoginPage() {
        navigate("/login")
    }

    return (
        !isLoading && (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>{productData.name} | CartZilla</title>
                    </Helmet>
                </HelmetProvider>
                <div>
                    <Link
                        to={".."}
                        relative="route"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Home
                    </Link>
                    <span className="num">
                        &gt;
                        <Link
                            to={"../" + cleanCatName}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {cleanCatName}
                        </Link>
                        &gt;
                        {productData.name}
                    </span>
                </div>
                <div>
                    <div className="px-1 py-1">
                        All Details of Product Here
                        <SplitLayout containerFluid={true} div1={40} div2={60}>
                            <div>
                                <ProductImagePreview images={productData.img} />
                                <div className="product-button-cart">
                                    {isAuth ? (
                                        <button onClick={() => addToCart(productData.pid)}>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <button onClick={toLoginPage}>Login</button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <ProductDetailsShow productData={productData} />
                            </div>
                        </SplitLayout>
                    </div>
                    <div>
                        <ProductSimilarCat
                            similarShow={similarShow}
                            productsData={productsData}
                            productData={productData}
                            cleanCatName={cleanCatName}
                        />
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="dark"
                />
            </>
        )
    )
}

export default ProductPage

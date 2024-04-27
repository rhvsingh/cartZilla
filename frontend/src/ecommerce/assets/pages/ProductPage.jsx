import React, { useEffect, useState, useRef, useContext } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import * as DOMPurify from "dompurify"
import axios from "axios"

import { config } from "../../utils/Constants"
import CartContext from "../../contexts/cartContext/CartContext"
import { addToCart } from "../../utils/productAddFunction"
import SEO from "../components/SEO"

import "./productShow.css"

const SplitLayout = React.lazy(() => import("../layouts/SplitLayout"))
const ProductImagePreview = React.lazy(() => import("../components/product/ProductImagePreview"))
const ProductSimilarCat = React.lazy(() => import("../components/product/ProductSimilarCat"))
const ProductDetailsShow = React.lazy(() => import("../components/product/ProductDetailsShow"))

const ProductPage = ({ isAuth }) => {
    const { catName, proName } = useParams()
    const { setTotalCartCount } = useContext(CartContext)
    const navigate = useNavigate()
    const { state } = useLocation()

    const cleanCatName = DOMPurify.sanitize(catName, { USE_PROFILES: { html: false } })
    const cleanProName = DOMPurify.sanitize(proName, { USE_PROFILES: { html: false } })

    const [productsData, setProductsData] = useState([])
    const [productData, setProductData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    let similarShow = useRef(true)

    useEffect(() => {
        let baseURL = config.url.API_URL

        if (state === null) {
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
        } else {
            setProductData(state)
            setIsLoading(false)
        }

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
    }, [cleanCatName, cleanProName, state, isAuth])

    function toLoginPage() {
        navigate("/login")
    }

    return (
        !isLoading && (
            <>
                <SEO title={`${productData.name} | CartZilla`} />
                {/* Breadcrum */}
                <div className="mx-1 mt-1" style={{ fontSize: "0.75rem" }}>
                    <Link
                        to={".."}
                        relative="route"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Home
                    </Link>
                    <span className="fw-5">
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
                    <div
                        className="px-1 py-1 mb-1 mt-50"
                        style={{ backgroundColor: "var(--white-color-f)", borderRadius: "8px" }}
                    >
                        All Details of Product Here
                        <SplitLayout
                            containerFluid={true}
                            div1={40}
                            div2={60}
                            styleComponent={{ minHeight: "unset" }}
                        >
                            <div className="product-page">
                                <ProductImagePreview images={productData.img} />
                                <div className="add-to-cart-button mt-1">
                                    {isAuth ? (
                                        <button
                                            onClick={() =>
                                                addToCart(productData.pid, setTotalCartCount)
                                            }
                                        >
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

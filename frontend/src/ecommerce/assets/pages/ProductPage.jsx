import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import * as DOMPurify from "dompurify"
import axios from "axios"

import { config } from "../../utils/Constants"
import { addToCart } from "../../utils/productAddFunction"

const ProductPage = ({ isAuth }) => {
    const { catName, proName } = useParams()

    const cleanCatName = DOMPurify.sanitize(catName, { USE_PROFILES: { html: false } })
    const cleanProName = DOMPurify.sanitize(proName, { USE_PROFILES: { html: false } })

    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
    }, [cleanCatName, cleanProName, isAuth])

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
                <div>Hello Bello</div>
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
    )
}

export default ProductPage

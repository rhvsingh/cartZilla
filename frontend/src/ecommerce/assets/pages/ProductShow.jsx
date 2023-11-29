import { useEffect, useState } from "react"
import ProductCardSkeleton from "../components/product/ProductCardSkeleton"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { HelmetProvider, Helmet } from "react-helmet-async"

import { config } from "../../utils/Constants"
import "./productShow.css"

import ProductCards from "../components/product/ProductCards"
//import ProductCardAdd from "../components/product/ProductCardAdd"

const baseURL = config.url.API_URL

const ProductShow = ({ isAuth }) => {
    const [products, setProducts] = useState([])
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
        let apiURL
        if (isAuth) {
            apiURL = baseURL + "products/" + localStorage.getItem("akey")
            axios
                .get(apiURL)
                .then((response) => {
                    setProducts(response.data.data)
                    setIsLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            apiURL = baseURL + "productList/"
            axios
                .get(apiURL)
                .then((response) => {
                    setProducts(response.data)
                    setIsLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }, [isAuth])

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Home Page | CartZilla</title>
                </Helmet>
            </HelmetProvider>
            <div className="products">
                {isLoading && <ProductCardSkeleton cards={4} />}
                {products.length > 0 &&
                    products.map((product) => {
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

export default ProductShow

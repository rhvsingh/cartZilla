import { useEffect, useState, lazy } from "react"
import { ToastContainer } from "react-toastify"
import axios from "axios"

import { config } from "../../utils/Constants"
import SEO from "../components/SEO"
import "./productShow.css"

const ProductCards = lazy(() => import("../components/product/ProductCards"))
const ProductCardSkeleton = lazy(() => import("../components/product/ProductCardSkeleton"))

const baseURL = config.url.API_URL

const ProductShow = ({ isAuth }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
                    console.error(error)
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
            <SEO title={"Home Page | CartZilla"} />
            <div className="products">
                {isLoading && <ProductCardSkeleton cards={4} />}
                {products.length > 0 &&
                    products.map((product) => {
                        return <ProductCards key={product.pid} product={product} />
                    })}
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
}

export default ProductShow

import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import userContext from "../../../contexts/userContext/userContext"

import { config } from "../../../utils/Constants"
import { commaAdder } from "../../../utils/utilityFunctions"
import { addToCart } from "../../../utils/productAddFunction"

import fallBackImage from "../../image/Image_not_available.png"

const ProductImageSkeleton = React.lazy(() => import("./ProductImageSkeleton"))

const ProductCards = ({ product, pageLink, proURL, path }) => {
    const navigate = useNavigate()
    const contextData = useContext(userContext)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    function toLoginPage() {
        navigate("/login")
    }

    const baseURL = config.url.API_URL

    let imagePath = baseURL + "uploads/"
    if (typeof product.img === "object") {
        imagePath += product.img[0]
    } else {
        imagePath += product.img
    }

    let productPrice = product.price.toFixed(2)
    let discountedPrice = (productPrice - (productPrice / 100) * product.discount).toFixed(2)
    let discount = product.discount

    return (
        <div className="product-card">
            <Link to={pageLink ? proURL : ""} relative={path ? "route" : "path"}>
                {!isLoaded && <ProductImageSkeleton />}
                <img
                    src={hasError ? fallBackImage : imagePath}
                    alt={product.name}
                    style={isLoaded ? {} : { display: "none" }}
                    onLoad={() => setIsLoaded((oldValue) => !oldValue)}
                    onError={() => setHasError((oldValue) => !oldValue)}
                />
                <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-amount">
                        <span className="product-price">
                            {discount > 0 ? commaAdder(discountedPrice) : commaAdder(productPrice)}{" "}
                        </span>
                        {discount > 0 ? (
                            <>
                                <span className="product-mrp">
                                    M.R.P.:{" "}
                                    <span className="product-price-mark">
                                        {commaAdder(productPrice)}
                                    </span>
                                </span>
                                <span className="product-discount">({discount}% off)</span>
                            </>
                        ) : (
                            ""
                        )}
                    </p>
                </div>
            </Link>
            <p className="product-button-cart">
                {contextData.isAuth ? (
                    <button onClick={() => addToCart(product.pid)}>Add to Cart</button>
                ) : (
                    <button onClick={toLoginPage}>Login</button>
                )}
            </p>
        </div>
    )
}

export default ProductCards

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { config } from "../../../utils/Constants"
import { commaAdder } from "../../../utils/utilityFunctions"

import fallBackImage from "../../image/Image_not_available.png"

const ProductImageSkeleton = React.lazy(() => import("./ProductImageSkeleton"))

const ProductCards = ({ product, pageLink, proURL, path }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

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
            <Link to={pageLink ? proURL : ""} relative={path ? "route" : "path"} state={product}>
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
                <p className="product-availability">
                    {product.stock > 0
                        ? product.stock > 50
                            ? "Product in stock"
                            : `Only ${product.stock} left in stock`
                        : "Out of stock"}
                </p>
            </Link>
        </div>
    )
}

export default ProductCards

import React from "react"
import { useNavigate } from "react-router-dom"

import { config } from "../../../utils/Constants"
import { commaAdder } from "../../../utils/utilityFunctions"

const ProductCards = ({ product, isAuth, cartAdder }) => {
    const navigate = useNavigate()

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

    let productPrice = product.price
    productPrice = productPrice.toFixed(2)
    let discountedPrice = productPrice - (productPrice / 100) * product.discount
    discountedPrice = discountedPrice.toFixed(2)
    let discount = product.discount

    return (
        <div className="product-card">
            <img src={imagePath} alt={product.name} />
            <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.desc}</p>
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
            <p className="product-button-cart">
                {isAuth ? (
                    <button onClick={() => cartAdder(product.pid)}>Add to Cart</button>
                ) : (
                    <button onClick={toLoginPage}>Login</button>
                )}
            </p>
        </div>
    )
}

export default ProductCards

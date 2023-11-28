import React from "react"
import { useNavigate } from "react-router-dom"

import { config } from "../../../utils/Constants"

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

    return (
        <div className="product-card">
            <img src={imagePath} alt={product.name} />
            <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.desc}</p>
                <p className="product-amount">
                    <span className="product-price">{product.price} </span>
                    <span className="product-discount">(-{product.discount}%)</span>
                </p>
                <p className="product-button-cart">
                    {isAuth ? (
                        <button onClick={() => cartAdder(product.pid)}>Add to Cart</button>
                    ) : (
                        <button onClick={toLoginPage}>Login</button>
                    )}
                </p>
            </div>
        </div>
    )
}

export default ProductCards

import React, { useState } from "react"
import { RiDeleteBin7Fill } from "react-icons/ri"

import { config } from "../../../utils/Constants"
import { commaAdder } from "../../../utils/utilityFunctions"

const CartEach = ({ details, deleteCart, changeQty, proFromCartDelete }) => {
    const baseURL = config.url.API_URL
    const proDetails = details.productDetails
    const [qty, setQty] = useState(details.qty)

    async function qtyChanger(qty, pid) {
        await changeQty(qty, pid)
        setQty((oldValue) => {
            let newValue = oldValue + qty
            if (newValue === 0) {
                deleteCart(details.pid)
            }
            if (newValue >= 0) {
                return newValue
            }
        })
    }

    let imagePath = baseURL + "uploads/"
    if (typeof proDetails.img === "object") {
        imagePath += proDetails.img[0]
    } else {
        imagePath += proDetails.img
    }

    let productPrice = proDetails.price.toFixed(2)
    let discountedPrice = (productPrice - (productPrice / 100) * proDetails.discount).toFixed(2)
    let discount = proDetails.discount

    let deleteButtonStyle = {
        fontSize: "0.85rem",
        position: "relative",
        top: "-4px",
    }

    return (
        <div className="cart-child d-flex align-items-center justify-between">
            <div className="d-flex align-items-center">
                <div className="cart-image">
                    <img src={imagePath} alt={proDetails.name} />
                </div>
                <div className="cart-child-detail px-1">
                    <div className="cart-name">{proDetails.name}</div>
                    <div className="cart-desc">{proDetails.desc}</div>
                    <div className="cart-amount cart-mobile-only">
                        {discount > 0 && (
                            <div className="cart-discount">
                                <span className="cart-discount-box">{discount}% off</span> Deal
                            </div>
                        )}
                        <div className="cart-price">
                            {discount > 0 ? commaAdder(discountedPrice) : commaAdder(productPrice)}{" "}
                        </div>
                        {discount > 0 && (
                            <div className="product-mrp">
                                M.R.P.:{" "}
                                <span className="product-price-mark">
                                    {commaAdder(productPrice)}
                                </span>
                            </div>
                        )}
                    </div>
                    <div
                        className="mt-1"
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            color: "var(--black-color-5)",
                        }}
                    >
                        {proDetails.stock > 0
                            ? proDetails.stock > 50
                                ? "Product in stock"
                                : `Only ${proDetails.stock} left in stock`
                            : "Out of stock"}
                    </div>
                    <div className="cart-qty">
                        Quantity:
                        <span className="cart-qty-container">
                            <span onClick={(e) => qtyChanger(-1, proDetails.pid)}>
                                {qty === 1 ? <RiDeleteBin7Fill style={deleteButtonStyle} /> : "-"}
                            </span>
                            {qty}
                            <span onClick={(e) => qtyChanger(1, proDetails.pid)}>+</span>
                        </span>
                        <span
                            className="cart-delete-button"
                            onClick={(e) => proFromCartDelete(proDetails.pid)}
                        >
                            Delete
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="cart-amount px-1">
                    {discount > 0 && (
                        <div className="cart-discount">
                            <span className="cart-discount-box">{discount}% off</span> Deal
                        </div>
                    )}
                    <div className="cart-price">
                        {discount > 0 ? commaAdder(discountedPrice) : commaAdder(productPrice)}{" "}
                    </div>
                    {discount > 0 && (
                        <div className="product-mrp">
                            M.R.P.:{" "}
                            <span className="product-price-mark">{commaAdder(productPrice)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartEach

import React from "react"

import { commaAdder } from "../../../utils/utilityFunctions"

const ProductDetailsShow = ({ productData }) => {
    let productPrice = productData.price
    productPrice = productPrice.toFixed(2)
    let discountedPrice = productPrice - (productPrice / 100) * productData.discount
    discountedPrice = discountedPrice.toFixed(2)
    let discount = productData.discount

    console.log(productData)
    return (
        <>
            <div className="" style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                {productData.name}
            </div>
            <div>
                {discount > 0 && <div>Deal</div>}
                <div className="cart-price">
                    {discount > 0 && <span className="cart-discount-box">-{discount}%</span>}
                    {discount > 0 ? commaAdder(discountedPrice) : commaAdder(productPrice)}{" "}
                </div>

                {discount > 0 && (
                    <span className="product-mrp">
                        M.R.P.:{" "}
                        <span className="product-price-mark">{commaAdder(productPrice)}</span>
                    </span>
                )}
            </div>
            <div>{productData.desc}</div>
        </>
    )
}

export default ProductDetailsShow

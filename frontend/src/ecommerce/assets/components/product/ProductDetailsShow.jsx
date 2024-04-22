import React from "react"

import { commaAdder } from "../../../utils/utilityFunctions"

const ProductDetailsShow = ({ productData }) => {
    let productPrice = productData.price.toFixed(2)
    let discountedPrice = (productPrice - (productPrice / 100) * productData.discount).toFixed(2)
    let discount = productData.discount

    return (
        <>
            <div
                className="product-line-separator mb-75 pb-50"
                style={{ fontWeight: "500", fontSize: "1.5rem" }}
            >
                {productData.name}
            </div>
            <div className="product-price-show mb-50">
                {discount > 0 && <div className="product-deal">Deal</div>}
                <div className="mt-25 mb-25">
                    {discount > 0 && <span className="product-deal-discount">-{discount}%</span>}
                    <span className="product-deal-price">
                        {discount > 0 ? commaAdder(discountedPrice) : commaAdder(productPrice)}{" "}
                    </span>
                </div>

                {discount > 0 && (
                    <span className="product-mrp-price">
                        M.R.P.:{" "}
                        <span className="product-deal-price">{commaAdder(productPrice)}</span>
                    </span>
                )}
            </div>
            <div
                className="mb-1"
                style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--black-color-5)" }}
            >
                {productData.stock > 0
                    ? productData.stock > 50
                        ? "Product in stock"
                        : `Only ${productData.stock} left in stock`
                    : "Out of stock"}
            </div>
            <div className="product-desc fw-5">{productData.desc}</div>
        </>
    )
}

export default ProductDetailsShow

import React, { useState } from "react"

import { config } from "../../../utils/Constants"

const ProductImagePreview = ({ images }) => {
    const baseURL = config.url.API_URL
    const [activeImage, setActiveImage] = useState("")

    let imagePath = baseURL + "uploads/"

    function imageActivator(e, imagePath) {
        let smallImage = document.querySelector(".small-image-container")
        smallImage
            .querySelector(".product-preview-active")
            .classList.remove("product-preview-active")
        e.target.classList.add("product-preview-active")

        setActiveImage(imagePath)
    }

    return (
        <div className="d-flex gap-1">
            <div
                style={{ flex: "20%" }}
                className="d-grid justify-center grid-auto-row gap-1 small-image-container"
            >
                {images.map((item, index) => {
                    return (
                        <img
                            key={index}
                            onMouseEnter={(e) => imageActivator(e, imagePath + item)}
                            className={
                                index === 0
                                    ? "product-preview-small-image product-preview-active"
                                    : "product-preview-small-image"
                            }
                            src={imagePath + item}
                            alt=""
                            onClick={(e) => imageActivator(e, imagePath + item)}
                        />
                    )
                })}
            </div>
            <div style={{ flex: "80%" }}>
                <img
                    className="product-focus-image-preview"
                    src={activeImage === "" ? imagePath + images[0] : activeImage}
                    alt=""
                />
            </div>
        </div>
    )
}

export default ProductImagePreview

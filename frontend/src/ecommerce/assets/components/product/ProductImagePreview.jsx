import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"

import { config } from "../../../utils/Constants"

const ProductImagePreview = ({ images }) => {
    const baseURL = config.url.API_URL
    let imagePath = baseURL + "uploads/"

    const [activeImage, setActiveImage] = useState("")
    const [bigImagePreview, setBigImagePreview] = useState(false)
    const [bigActiveImage, setBigActiveImage] = useState("")

    useEffect(() => {
        let imagePath = config.url.API_URL + "uploads/"
        setActiveImage(imagePath + images[0])
    }, [images])

    function imageActivator(e, imagePath) {
        let smallImage = document.querySelector(".small-image-container")
        if (smallImage.querySelector(".product-preview-active") !== null) {
            smallImage
                .querySelector(".product-preview-active")
                .classList.remove("product-preview-active")
        }

        e.target.classList.add("product-preview-active")

        setActiveImage(imagePath)
    }

    function bigImageActivator(e, imagePath) {
        let smallImage = document.querySelector(".image-big-slide")
        smallImage
            .querySelector(".product-preview-active")
            .classList.remove("product-preview-active")
        e.target.classList.add("product-preview-active")
        setBigActiveImage(imagePath)
    }

    function bigImagePreviewActivator() {
        setBigActiveImage(activeImage === "" ? imagePath + images[0] : activeImage)
        setBigImagePreview((oldValue) => !oldValue)
    }

    return (
        <div className="d-flex gap-1 align-items-start image-responsive-view">
            <div
                style={{ flex: "20%" }}
                className="d-grid justify-center grid-auto-row grid-auto-column gap-1 small-image-container"
            >
                {images.map((item, index) => (
                    <img
                        key={item}
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
                ))}
            </div>
            <div style={{ flex: "80%" }}>
                <img
                    className="product-focus-image-preview"
                    src={activeImage === "" ? imagePath + images[0] : activeImage}
                    alt=""
                    onClick={bigImagePreviewActivator}
                />
            </div>

            {/* Image Big Preview Modal*/}
            {bigImagePreview && (
                <div className="image-big-preview-modal">
                    <div
                        className="image-preview-overlay"
                        onClick={() => setBigImagePreview((oldValue) => !oldValue)}
                    ></div>
                    <div className="container-2">
                        <div className="image-modal-close">
                            <button onClick={() => setBigImagePreview((oldValue) => !oldValue)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="image-big-container d-flex mx-auto">
                            <img src={bigActiveImage} alt="" />
                        </div>
                        <div className="image-big-slide d-flex justify-center align-items-center flex-wrap-wrap gap-50 mt-1">
                            {images.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img
                                            src={imagePath + item}
                                            className={
                                                imagePath + item === bigActiveImage
                                                    ? "product-preview-small-image product-preview-active"
                                                    : "product-preview-small-image"
                                            }
                                            alt=""
                                            onMouseEnter={(e) =>
                                                bigImageActivator(e, imagePath + item)
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductImagePreview

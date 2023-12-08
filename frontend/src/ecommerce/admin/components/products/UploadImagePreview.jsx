import React from "react"
import { RiImageAddFill, RiFileExcelFill } from "react-icons/ri"

import AdminStyle from "../css-modules/admin.module.css"

const UploadImagePreview = ({ image, index, imageReplacerButton, removeImage }) => {
    return (
        <div
            key={index}
            className={
                index === 0
                    ? AdminStyle.coverImage + " " + AdminStyle.imageLabel
                    : AdminStyle.imageLabel
            }
        >
            <img src={URL.createObjectURL(image)} className={AdminStyle.imagePreview} alt="" />
            <div className={AdminStyle.imageOptions + " d-flex align-items-center"}>
                <RiImageAddFill
                    onClick={() => imageReplacerButton(index)}
                    title="Replace Image"
                    htmlFor="product-image-replacer"
                />

                <RiFileExcelFill title="Remove Image" onClick={() => removeImage(index)} />
            </div>
        </div>
    )
}

export default UploadImagePreview

import { useRef } from "react"
import UploadImagePreview from "./UploadImagePreview"
import { RiImageAddFill } from "react-icons/ri"

import AdminStyle from "../css-modules/admin.module.css"

const ProductUploadImage = ({ imgFile, setImgFile }) => {
    const inputReplacer = useRef()
    let imageIndexSelected = null

    /* These are iamge functions to add new images, replace single image, click on hidden input from edit icon
     and remove image to remove from array of images */

    const imageChanger = (e) => {
        setImgFile((oldValue) => {
            for (let i = 0; i < e.target.files.length; i++) {
                oldValue = [...oldValue, e.target.files[i]]
            }
            return oldValue
        })
    }

    const imageReplacer = (e) => {
        setImgFile((oldValue) =>
            oldValue.map((item, i) => (i === imageIndexSelected ? e.target.files[0] : item))
        )
    }

    const imageReplacerButton = (index) => {
        imageIndexSelected = index
        inputReplacer.current.click()
    }

    const removeImage = (index) => {
        setImgFile((oldValue) => oldValue.filter((item, i) => i !== index && item))
    }
    return (
        <>
            <div className={AdminStyle.mainTitle}>Product Images</div>
            <div className={AdminStyle.grid}>
                <input
                    id="product-image-replacer"
                    name="product-image-replacer"
                    type="file"
                    ref={inputReplacer}
                    onChange={imageReplacer}
                    hidden
                />
                <input
                    id="product-image-input"
                    name="product-image-input[]"
                    type="file"
                    onChange={imageChanger}
                    hidden
                    multiple
                />
                <label htmlFor="product-image-input" id={AdminStyle.productImageInput}>
                    <div>
                        <RiImageAddFill className={AdminStyle.productImageIcon} />
                        <br />
                        <span
                            style={{
                                textDecoration: "underline",
                                color: "var(--main-color-2)",
                            }}
                        >
                            Click to upload
                        </span>{" "}
                        or drag and drop
                    </div>
                </label>
                {imgFile &&
                    imgFile.map((image, index) => (
                        <UploadImagePreview
                            key={index}
                            image={image}
                            index={index}
                            imageReplacerButton={imageReplacerButton}
                            removeImage={removeImage}
                        />
                    ))}

                {/* <img
                            src={imgFile[0] === "" ? "" : URL.createObjectURL(imgFile)}
                            className={AdminStyle.imagePreview}
                            alt=""
                        />*/}
            </div>
            <div style={{ fontSize: "0.7rem" }}>Max 5 images can be uploaded at a time.</div>
        </>
    )
}

export default ProductUploadImage

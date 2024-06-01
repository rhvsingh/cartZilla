import { useRef, useState, useContext } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { RiImageAddFill } from "react-icons/ri"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

import { config } from "../../../utils/Constants"
import AdminCatContext from "../../../contexts/adminContext/adminCatContext"
import SelectCategory from "./SelectCategory"
import UploadImagePreview from "./UploadImagePreview"

import AdminStyle from "../css-modules/admin.module.css"
import "../css-modules/productAdd.css"

const AddNewProduct = ({ setNewProductComponent }) => {
    const { category,fetchProductDetails } = useContext(AdminCatContext)

    const [imgFile, setImgFile] = useState([])
    const proName = useRef()
    const proDesc = useRef()
    const proPrice = useRef()
    const proDiscount = useRef()
    const proStock = useRef()
    const [proCategory, setProCategory] = useState([])

    const inputReplacer = useRef()

    const baseURL = config.url.API_URL + "admin/"

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

    const productAdd = (data) => {
        axios
            .post(baseURL + "addProduct", {
                email: data.email,
                akey: data.akey,
                img: data.img,
                name: data.name,
                desc: data.desc,
                price: parseInt(data.price),
                discount: parseInt(data.discount),
                category: data.proCategory,
                stock: data.stock,
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    //let pid = response.data.pid
                    //let newData = { pid, ...data }
                    toast.success("🦄 Wow so easy! Product Added!")

                    setTimeout(() => {
                        setNewProductComponent((oldValue) => !oldValue)
                    }, 1500)

                    fetchProductDetails()

                    /* setProducts((oldValue) => {
                        return [newData].concat(oldValue) //[...oldValue, data]
                    }) */
                }
            })
    }

    /* Function that call api to add product with image(s) */

    async function formData(e) {
        e.preventDefault()

        let email = localStorage.getItem("email")
        let akey = localStorage.getItem("akey")
        let data = new FormData()

        imgFile.forEach((eachImg) => data.append("productImage", eachImg))

        data.append("email", email)
        data.append("akey", akey)

        let img
        await axios.post(baseURL + "product/img", data).then((response) => {
            console.log(response.data)
            img = response.data.imgName
        })

        let name = proName.current.value
        let desc = proDesc.current.value
        let price = parseInt(proPrice.current.value)
        let discount = parseInt(proDiscount.current.value)
        let stock = parseInt(proStock.current.value)
        productAdd({ email, akey, img, name, desc, price, discount, stock, proCategory })
    }

    /* Drop-down function to select multiple categories */

    const defaultSelect = (e) => {
        let newCategory = e.target.value
        setProCategory((oldValue) => {
            let check = oldValue.filter((item) => item === newCategory)
            if (check.length > 0) {
                return oldValue
            } else {
                return [...oldValue, newCategory]
            }
        })

        e.target.value = "DEFAULT"
    }

    return (
        <>
            <div
                className={AdminStyle.backButton}
                onClick={() => {
                    setNewProductComponent((oldValue) => !oldValue)
                }}
                role="button"
            >
                <div className="d-flex align-items-center gap-2">
                    <div>
                        <FaArrowLeftLong className={AdminStyle.smallArrowSize} />
                    </div>
                    <div>
                        <div className={AdminStyle.smallTitle}>Back to product list</div>
                        <div className={AdminStyle.mainTitle}>Add New Product</div>
                    </div>
                </div>
            </div>
            <div className="pl-1 py-1">
                <p className={AdminStyle.mainTitle}>Product Details</p>
                <form onSubmit={formData} encType="multipart/form-data">
                    <div className="add-pro-form">
                        <div className="form-inputs">
                            <input type="text" placeholder="Enter name" ref={proName} required />
                        </div>
                    </div>

                    <div className="form-inputs">
                        {/* <input
                                type="text"
                                placeholder="Enter description"
                                ref={proDesc}
                                required
                            /> */}
                        <textarea placeholder="Enter description" ref={proDesc} required></textarea>
                    </div>

                    <div className="add-pro-form">
                        <div className="form-inputs">
                            <input type="text" placeholder="Enter price" ref={proPrice} required />
                        </div>
                        <div className="form-inputs">
                            <input
                                type="text"
                                placeholder="Enter discount"
                                ref={proDiscount}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-pro-form">
                        <div className="form-inputs">
                            <input type="text" placeholder="Enter stock" ref={proStock} required />
                        </div>
                    </div>
                    <div className="form-inputs">
                        <div className={AdminStyle.mainTitle}>Product Category</div>
                        <div style={{ fontSize: "0.7rem" }}>
                            First dropdown is main category others sub-categories.
                        </div>
                        <div id="category-container">
                            {proCategory &&
                                proCategory.map((item, index) => (
                                    <SelectCategory
                                        category={category}
                                        proCategory={proCategory}
                                        setProCategory={setProCategory}
                                        proIndex={index}
                                        key={index}
                                    />
                                ))}
                            <select
                                name="category-select"
                                defaultValue={"DEFAULT"}
                                onChange={defaultSelect}
                                required
                            >
                                <option value="DEFAULT" disabled>
                                    --Select Category--
                                </option>
                                {category.map((item) => {
                                    return (
                                        !proCategory.includes(item._id) && (
                                            <option value={item._id} key={item._id}>
                                                {item.catName}
                                            </option>
                                        )
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="py-1">
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
                        <div style={{ fontSize: "0.7rem" }}>
                            Max 5 images can be uploaded at a time.
                        </div>
                    </div>
                    <div className="form-inputs">
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default AddNewProduct

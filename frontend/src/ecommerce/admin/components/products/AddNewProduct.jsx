import { useRef, useState, useContext } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { RiImageAddFill, RiFileExcelFill } from "react-icons/ri"
import axios from "axios"
import { toast } from "react-toastify"

import { config } from "../../../utils/Constants"
import AdminCatContext from "../../../contexts/adminContext/adminCatContext"

import AdminStyle from "../css-modules/admin.module.css"
import "../css-modules/productAdd.css"

const SelectCategory = ({ category, proCategory, setProCategory, proIndex }) => {
    const defaulState = proCategory[proIndex]

    const selectChange = (e) => {
        let newCategory = e.target.value
        setProCategory((oldValue) => {
            let check = oldValue.filter((item) => item === newCategory)
            if (check.length > 0) {
                alert("Category already selected")
                e.target.value = defaulState
                return oldValue
            } else {
                return oldValue.map((item, i) => (i === proIndex ? newCategory : item))
            }
        })
    }

    const catRemove = (e) => {
        setProCategory((oldValue) => oldValue.filter((item, index) => index !== e))
    }

    return (
        <span className="my-1 mx-1">
            <select
                name="category-select"
                defaultValue={defaulState}
                onChange={selectChange}
                required
            >
                <option value="DEFAULT" disabled>
                    --Select Category--
                </option>
                {category.map((item) => (
                    <option value={item._id} key={item._id}>
                        {item.catName}
                    </option>
                ))}
            </select>
            <RiFileExcelFill
                className={AdminStyle.catIcon + " pos-relative"}
                onClick={() => catRemove(proIndex)}
            />
        </span>
    )
}

const AddNewProduct = ({ setNewProductComponent }) => {
    const { category } = useContext(AdminCatContext)

    const [imgFile, setImgFile] = useState([])
    const proName = useRef()
    const proDesc = useRef()
    const proPrice = useRef()
    const proDiscount = useRef()
    const proStock = useRef()
    const [proCategory, setProCategory] = useState([])

    const inputReplacer = useRef()

    const baseURL = config.url.API_URL

    let imageIndexSelected = null

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
                img: data.img,
                name: data.name,
                desc: data.desc,
                price: parseInt(data.price),
                discount: parseInt(data.discount),
                category: data.proCategory,
                stock: data.stock,
            })
            .then((response) => {
                if (response.status === 200) {
                    //let pid = response.data.pid
                    //let newData = { pid, ...data }
                    toast.success("🦄 Wow so easy! Product Added!")

                    /* setProducts((oldValue) => {
                        return [newData].concat(oldValue) //[...oldValue, data]
                    }) */
                }
            })
    }

    async function formData(e) {
        e.preventDefault()

        let data = new FormData()

        data.append("productImage", imgFile)

        let img
        await axios.post(baseURL + "product/img/test", data).then((response) => {
            console.log(response.data.imgName)
            img = response.data.imgName
        })

        let name = proName.current.value
        let desc = proDesc.current.value
        let price = parseInt(proPrice.current.value)
        let discount = parseInt(proDiscount.current.value)
        let stock = parseInt(proStock.current.value)
        productAdd({ img, name, desc, price, discount, stock, proCategory })
    }

    const defaultSelect = (e) => {
        let newCategory = e.target.value
        setProCategory((oldValue) => {
            let check = oldValue.filter((item) => item === newCategory)
            if (check.length > 0) {
                alert("Category already selected")
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

            <form onSubmit={formData} encType="multipart/form-data">
                <div>
                    <input type="text" placeholder="Enter name" ref={proName} required />
                </div>
                <div>
                    <input type="text" placeholder="Enter description" ref={proDesc} required />
                </div>
                <div>
                    <input type="text" placeholder="Enter price" ref={proPrice} required />
                </div>
                <div>
                    <input type="text" placeholder="Enter discount" ref={proDiscount} required />
                </div>
                <div>
                    <input type="text" placeholder="Enter stock" ref={proStock} required />
                </div>
                <div>
                    <div className={AdminStyle.mainTitle}>Product Category</div>
                    <div id="cateogory-container">
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
                            {category.map((item) => (
                                <option value={item._id} key={item._id}>
                                    {item.catName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="px-1 py-1">
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
                            required
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
                            imgFile.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            index === 0
                                                ? AdminStyle.coverImage +
                                                  " " +
                                                  AdminStyle.imageLabel
                                                : AdminStyle.imageLabel
                                        }
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            className={AdminStyle.imagePreview}
                                            alt=""
                                        />
                                        <div
                                            className={
                                                AdminStyle.imageOptions +
                                                " d-flex align-items-center"
                                            }
                                        >
                                            <RiImageAddFill
                                                onClick={() => imageReplacerButton(index)}
                                                title="Replace Image"
                                                htmlFor="product-image-replacer"
                                            />

                                            <RiFileExcelFill
                                                title="Remove Image"
                                                onClick={() => removeImage(index)}
                                            />
                                        </div>
                                    </div>
                                )
                            })}

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
                <div>
                    <input type="submit" value="Add" />
                </div>
            </form>
        </>
    )
}

export default AddNewProduct

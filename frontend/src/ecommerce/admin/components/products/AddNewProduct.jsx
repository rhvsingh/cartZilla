import { useRef, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

import { config } from "../../../utils/Constants"
import AdminCatContext from "../../../contexts/adminContext/adminCatContext"
import SelectCategory from "./SelectCategory"
import ProductUploadImage from "./ProductUploadImage"

import TextEditor from "../../../utils/TextEditor"

import AdminStyle from "../css-modules/admin.module.css"
import "../css-modules/productAdd.css"

const AddNewProduct = ({ setNewProductComponent, pid, product }) => {
    const { category, fetchProductDetails } = useContext(AdminCatContext)
    const navigate = useNavigate()

    const [proDesc, setProDesc] = useState(product?.desc || null)
    const [imgFile, setImgFile] = useState(product?.img || [])
    const proName = useRef()
    //const proDesc = useRef()
    const proPrice = useRef()
    const proDiscount = useRef()
    const proStock = useRef()
    const [proCategory, setProCategory] = useState([])

    const baseURL = config.url.API_URL + "admin/"

    console.log(imgFile)

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
        //let desc = proDesc.current.value
        let desc = proDesc
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

    const prevStep = () => {
        console.log()
        if (typeof setNewProductComponent === "undefined") {
            navigate(-1)
        } else {
            setNewProductComponent((oldValue) => !oldValue)
        }
    }

    useEffect(() => {
        function proCatExt(data) {
            let cat = []
            data.forEach((item) => {
                cat.push(item._id)
            })
            return cat
        }

        if (typeof product !== "undefined" && typeof product === "object") {
            proName.current.value = product.name
            //setProDesc(product.desc)
            proPrice.current.value = product.price
            proDiscount.current.value = product.discount
            proStock.current.value = product.stock

            setProCategory(proCatExt(product.category))
            //setImgFile(product.img)
        }
    }, [product])

    return (
        <>
            <div className={AdminStyle.backButton} onClick={prevStep} role="button">
                <div className="d-flex align-items-center gap-2">
                    <div>
                        <FaArrowLeftLong className={AdminStyle.smallArrowSize} />
                    </div>
                    <div>
                        <div className={AdminStyle.smallTitle}>Back to product list</div>
                        <div className={AdminStyle.mainTitle}>
                            {typeof pid === "undefined" ? "Add New Product" : "Edit Product"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pl-1 py-1">
                <form onSubmit={formData} encType="multipart/form-data">
                    <div className="d-flex gap-2 flex-wrap-wrap">
                        <div style={{ flex: "3" }}>
                            <label htmlFor="product-name" className={AdminStyle.mainTitle}>
                                Name
                            </label>
                            <div className="add-pro-form">
                                <div className="form-inputs">
                                    <input
                                        type="text"
                                        id="product-name"
                                        placeholder="Enter name"
                                        ref={proName}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-inputs">
                                <p className={AdminStyle.mainTitle}>Description</p>
                                <TextEditor context={proDesc} setContext={setProDesc} />
                                {/* <input
                                type="text"
                                placeholder="Enter description"
                                ref={proDesc}
                                required
                            /> */}

                                {/* <textarea placeholder="Enter description" ref={proDesc} required></textarea> */}
                            </div>

                            <div className="add-pro-form">
                                <div className="form-inputs">
                                    <label htmlFor="product-price" className={AdminStyle.mainTitle}>
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        id="product-price"
                                        placeholder="Enter price"
                                        ref={proPrice}
                                        required
                                    />
                                </div>
                                <div className="form-inputs">
                                    <label
                                        htmlFor="product-discount"
                                        className={AdminStyle.mainTitle}
                                    >
                                        Discount
                                    </label>
                                    <input
                                        type="text"
                                        id="product-discount"
                                        placeholder="Enter discount"
                                        ref={proDiscount}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="add-pro-form">
                                <div className="form-inputs">
                                    <label htmlFor="product-stock" className={AdminStyle.mainTitle}>
                                        Stock
                                    </label>
                                    <input
                                        type="text"
                                        id="product-stock"
                                        placeholder="Enter stock"
                                        ref={proStock}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-inputs">
                                <label className={AdminStyle.mainTitle} htmlFor="product-category">
                                    Product Category
                                </label>
                                <div style={{ fontSize: "0.7rem" }}>
                                    First dropdown is main category others sub-categories.
                                </div>
                                <div id="category-container" aria-labelledby="product-category">
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
                                        id="product-category"
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
                        </div>
                        <div className="py-1" style={{ flexGrow: "1" }}>
                            <ProductUploadImage imgFile={imgFile} setImgFile={setImgFile} />
                        </div>
                    </div>
                    <div className="form-inputs">
                        <input
                            type="submit"
                            value={typeof pid === "undefined" ? "Add" : "Update"}
                        />
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

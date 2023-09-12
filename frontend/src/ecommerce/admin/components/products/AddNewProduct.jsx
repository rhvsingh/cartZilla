import { useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { RiImageAddFill } from "react-icons/ri"
import axios from "axios"
import { toast } from "react-toastify"

import { config } from "../../../utils/Constants"

import AdminStyle from "../css-modules/admin.module.css"
import "../css-modules/productAdd.css"

const AddNewProduct = ({ setNewProduct }) => {
    const [imgFile, setImgFile] = useState("")
    const proName = useRef()
    const proDesc = useRef()
    const proPrice = useRef()
    const proDiscount = useRef()

    const baseURL = config.url.API_URL

    const imageChanger = (e) => {
        setImgFile(e.target.files[0])
    }

    const productAdd = (data) => {
        axios
            .post(baseURL + "addProduct", {
                img: data.img,
                name: data.name,
                desc: data.desc,
                price: parseInt(data.price),
                discount: parseInt(data.discount),
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
        productAdd({ img, name, desc, price, discount })
    }

    return (
        <>
            <div
                className={AdminStyle.backButton}
                onClick={() => {
                    setNewProduct((oldValue) => !oldValue)
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
                <div className="px-1 py-1">
                    <div className={AdminStyle.mainTitle}>Product Images</div>
                    <div>
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
                        <img
                            src={imgFile === "" ? "" : URL.createObjectURL(imgFile)}
                            style={{ width: "100%", display: "block", borderRadius: "4px" }}
                            alt=""
                        />
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

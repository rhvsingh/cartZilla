import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import { FaArrowLeftLong } from "react-icons/fa6"

import { config } from "../../../utils/Constants"
import AdminCatContext from "../../../contexts/adminContext/adminCatContext"
import EachCategory from "./EachCategory"

import AdminStyle from "../css-modules/admin.module.css"

const Category = ({ setCategoryComponent }) => {
    const baseURL = config.url.API_URL + "admin/"

    const { category, categoryFetcher } = useContext(AdminCatContext)

    const [catName, setCatName] = useState("")
    const [catKeyword, setCatKeyword] = useState("")
    const catDesc = useRef("")

    const nameChecker = (e) => {
        setCatName(e.target.value)
    }

    const keywordChecker = (e) => {
        setCatKeyword(e.target.value)
    }

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            let data = {
                email: localStorage.getItem("email"),
                akey: localStorage.getItem("akey"),
                catId: id,
            }
            axios
                .delete(baseURL + "catDel", {
                    params: data,
                })
                .then((response) => {
                    let responseData = response.data
                    if (responseData.status === 200) {
                        categoryFetcher()
                    } else if (responseData.status === 403) {
                        console.log("Unable to delete due to some reason")
                    } else {
                        console.log(responseData)
                    }
                })
        }
    }

    const categoryAddForm = async (e) => {
        e.preventDefault()

        let formData = {
            email: localStorage.getItem("email"),
            akey: localStorage.getItem("akey"),
            catName: catName,
            catKeyword: catKeyword,
            catDesc: catDesc.current.value,
        }

        axios.post(baseURL + "catAdd", formData).then((response) => {
            console.log(response.data)
            if (response.data.status === 200) {
                categoryFetcher()
            }
        })

        catDesc.current.value = ""
        setCatName("")
        setCatKeyword("")
    }

    return (
        <>
            <div
                className={AdminStyle.backButton}
                onClick={() => setCategoryComponent((oldValue) => !oldValue)}
                role="button"
            >
                <div className="d-flex align-items-center gap-2">
                    <div>
                        <FaArrowLeftLong className={AdminStyle.smallArrowSize} />
                    </div>
                    <div>
                        <div className={AdminStyle.smallTitle}>Back to product page</div>
                        <div className={AdminStyle.mainTitle}>Category</div>
                    </div>
                </div>
            </div>
            <div className="pl-1 py-1">
                <div>
                    Add New Category
                    <form action="" onSubmit={categoryAddForm}>
                        <input
                            type="text"
                            id="cat-name"
                            name="cat-name"
                            value={catName}
                            onChange={nameChecker}
                            placeholder="Category Name"
                            required
                        />
                        <input
                            type="text"
                            id="cat-keyword"
                            name="cat-keyword"
                            value={catKeyword}
                            onChange={keywordChecker}
                            placeholder="Keyword"
                        />
                        <input
                            type="text"
                            id="cat-desc"
                            name="cat-desc"
                            ref={catDesc}
                            placeholder="Description"
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="py-2">
                    <div>Category</div>
                    <div className="category-table">
                        {category.map((item) => (
                            <EachCategory
                                item={item}
                                key={item._id}
                                deleteCategory={deleteCategory}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category

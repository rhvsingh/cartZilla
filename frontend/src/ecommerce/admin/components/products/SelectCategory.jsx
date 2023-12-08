import React from "react"
import { RiFileExcelFill } from "react-icons/ri"

import AdminStyle from "../css-modules/admin.module.css"

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
        <span className="my-1 mr-1">
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

export default SelectCategory

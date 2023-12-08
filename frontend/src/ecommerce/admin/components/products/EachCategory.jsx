import React, { useContext, useRef, useState } from "react"
import axios from "axios"
import { RiFileCloseFill, RiEditBoxFill, RiDeleteBin6Fill, RiSave2Fill } from "react-icons/ri"
import { config } from "../../../utils/Constants"
import AdminCatContext from "../../../contexts/adminContext/adminCatContext"

const styleForEdit = {
    border: "1px solid #ccc",
    flex: "100%",
}

const baseURL = config.url.API_URL + "admin/"

const EditCategory = ({ item, setEditToggler }) => {
    const { updateOneCategory } = useContext(AdminCatContext)

    const catName = useRef(item.catName)
    const catKeyword = useRef(item.catKeyword)
    const catDesc = useRef(item.catDesc)
    const saveEdits = () => {
        if (
            item.catName === catName.current.value &&
            item.catKeyword === catKeyword.current.value &&
            item.catDesc === catDesc.current.value
        ) {
            alert("No changes were made")
            return
        }

        let data = {
            email: localStorage.getItem("email"),
            akey: localStorage.getItem("akey"),
            catId: item._id,
            catName: catName.current.value,
            catKeyword: catKeyword.current.value,
            catDesc: catDesc.current.value,
        }

        axios.put(baseURL + "catEdit", data).then((response) => {
            let responseData = response.data
            if (responseData.status === 200) {
                setEditToggler((oldValue) => !oldValue)
                updateOneCategory(data)
            } else if (responseData.status === 403) {
                console.log("Unable to edit due to some reason")
            } else {
                console.log(responseData)
            }
        })
    }

    return (
        <div className="category-each">
            <div className="d-flex gap-2 justify-between align-items-center my-1">
                <input
                    style={styleForEdit}
                    name="category-name"
                    defaultValue={catName.current}
                    ref={catName}
                />
                <input
                    style={styleForEdit}
                    name="category-keyword"
                    defaultValue={catKeyword.current}
                    ref={catKeyword}
                />
                <input
                    style={styleForEdit}
                    name="category-description"
                    defaultValue={catDesc.current}
                    ref={catDesc}
                />
            </div>
            <div>
                <button
                    onClick={saveEdits}
                    className="px-1"
                    style={{ fontSize: "0.8rem", paddingBlock: "0.25rem", cursor: "pointer" }}
                >
                    <RiSave2Fill className="pos-relative" style={{ top: "2px" }} /> Save
                </button>
            </div>
        </div>
    )
}

const EachCategory = ({ item, deleteCategory }) => {
    const [editToggler, setEditToggler] = useState(false)

    const handleEdit = (item) => {
        setEditToggler((oldValue) => !oldValue)
    }

    return (
        <div className="category-each">
            <div className="d-flex gap-2 justify-between align-items-center">
                <div>{item.catName}</div>
                <div className="category-keyword">
                    {item.catKeyword
                        .split(",")
                        .map((child, index) => child !== "" && <span key={index}>{child}</span>)}
                </div>
                <div>{item.catDesc}</div>
                <div>
                    {editToggler ? (
                        <RiFileCloseFill className="category-icons" onClick={handleEdit} />
                    ) : (
                        <RiEditBoxFill className="category-icons" onClick={handleEdit} />
                    )}
                    <RiDeleteBin6Fill
                        className="category-icons"
                        onClick={() => deleteCategory(item._id)}
                    />
                </div>
            </div>

            {editToggler && <EditCategory item={item} setEditToggler={setEditToggler} />}
        </div>
    )
}

export default EachCategory

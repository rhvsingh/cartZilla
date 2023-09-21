import React from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"

const EachCategory = ({ item, deleteCategory }) => {
    return (
        <div className="d-flex gap-2 py-1 px-1">
            <div>{item.catName}</div>
            <div>{item.catKeyword}</div>
            <div>{item.catDesc}</div>
            <div>
                <RiDeleteBin6Fill onClick={() => deleteCategory(item._id)} />
            </div>
        </div>
    )
}

export default EachCategory

import React from "react"
import { RiEditBoxFill, RiDeleteBin6Fill } from "react-icons/ri"

const EachCategory = ({ item, deleteCategory }) => {
    return (
        <div className="d-flex gap-2 align-items-center category-each">
            <div>{item.catName}</div>
            <div className="category-keyword">
                {item.catKeyword.split(",").map((child, index) => (
                    <span key={index}>{child}</span>
                ))}
            </div>
            <div>{item.catDesc}</div>
            <div>
                <RiEditBoxFill className="category-icons" />
                <RiDeleteBin6Fill
                    className="category-icons"
                    onClick={() => deleteCategory(item._id)}
                />
            </div>
        </div>
    )
}

export default EachCategory

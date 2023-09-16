import React from "react"

const Category = ({ setCategoryComponent }) => {
    return (
        <div>
            Category
            <button onClick={() => setCategoryComponent((oldValue) => !oldValue)}>
                Close Category
            </button>
        </div>
    )
}

export default Category

import React, { useState } from "react"

import AddNewProduct from "./products/AddNewProduct"

import AdminStyle from "./css-modules/admin.module.css"

const Products = () => {
    const [newProduct, setNewProduct] = useState(false)

    return (
        <>
            <div
                className="d-flex px-1 py-1"
                style={{
                    borderBottom: "1px solid var(--white-color-d)",
                    padding: "1.8rem 1.5rem",
                }}
            >
                <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Products</div>
            </div>
            <div className="px-1 py-1">
                {newProduct ? (
                    <AddNewProduct setNewProduct={setNewProduct} />
                ) : (
                    <button
                        className={AdminStyle.addNewProductButton}
                        onClick={() => {
                            setNewProduct((oldValue) => !oldValue)
                        }}
                    >
                        Add New Product
                    </button>
                )}
            </div>
        </>
    )
}

export default Products

import React, { useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"

import AddNewProduct from "./products/AddNewProduct"
import Category from "./products/Category"

import AdminStyle from "./css-modules/admin.module.css"

const Products = () => {
    const [newProductComponent, setNewProductComponent] = useState(false)
    const [categoryComponent, setCategoryComponent] = useState(false)
    const [newProductButton, setNewProductButton] = useState(true)
    const nodeRef = useRef(null)

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
            <div className="pl-1 py-1" style={{ overflow: "hidden" }}>
                {newProductButton && (
                    <div className="d-flex gap-1">
                        <button
                            className={AdminStyle.addNewProductButton}
                            onClick={() => {
                                setNewProductComponent((oldValue) => !oldValue)
                            }}
                        >
                            Add New Product
                        </button>

                        <button
                            className={AdminStyle.addNewProductButton}
                            onClick={() => {
                                setCategoryComponent((oldValue) => !oldValue)
                            }}
                        >
                            Category
                        </button>
                    </div>
                )}

                <CSSTransition
                    in={newProductComponent}
                    nodeRef={nodeRef}
                    timeout={1000}
                    classNames="my-node"
                    unmountOnExit
                    onEnter={() => setNewProductButton(false)}
                    onExited={() => setNewProductButton(true)}
                >
                    <div ref={nodeRef}>
                        <AddNewProduct setNewProductComponent={setNewProductComponent} />
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={categoryComponent}
                    nodeRef={nodeRef}
                    timeout={1000}
                    classNames="my-node"
                    unmountOnExit
                    onEnter={() => setNewProductButton(false)}
                    onExited={() => setNewProductButton(true)}
                >
                    <div ref={nodeRef}>
                        <Category setCategoryComponent={setCategoryComponent} />
                    </div>
                </CSSTransition>
            </div>
        </>
    )
}

export default Products

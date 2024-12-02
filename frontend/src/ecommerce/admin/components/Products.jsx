import React, { useState, useRef, useContext } from "react"
import { CSSTransition } from "react-transition-group"

import AdminCatContext from "../../contexts/adminContext/adminCatContext"
import SEO from "../../assets/components/SEO"
import ProductShow from "./products/ProductShow"
import AddNewProduct from "./products/AddNewProduct"
import Category from "./products/Category"

import AdminStyle from "./css-modules/admin.module.css"

const Products = () => {
    const { products } = useContext(AdminCatContext)

    const [newProductComponent, setNewProductComponent] = useState(false)
    const [categoryComponent, setCategoryComponent] = useState(false)
    const [newProductButton, setNewProductButton] = useState(true)
    const nodeRef = useRef(null)
    const nodeRef2 = useRef(null)

    return (
        <>
            <SEO title="Products | CartZilla" />
            <div
                className="d-flex px-1 py-1 justify-between align-items-center"
                style={{
                    borderBottom: "1px solid var(--white-color-d)",
                    paddingInline: "1.5rem",
                    height: "4.9rem",
                }}
            >
                <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>Products</div>
                <div>
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
                </div>
            </div>
            <div className="pl-1 py-1" style={{ overflow: "hidden" }}>
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
            <div className="px-2 pb-2">
                <CSSTransition
                    in={newProductButton}
                    nodeRef={nodeRef2}
                    timeout={10}
                    classNames="my-node"
                    unmountOnExit
                >
                    <div ref={nodeRef2} style={{ overflow: "auto" }}>
                        <ProductShow products={products} />
                    </div>
                </CSSTransition>
            </div>
        </>
    )
}

export default Products

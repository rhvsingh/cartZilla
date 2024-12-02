import { useContext } from "react"
import { useParams } from "react-router-dom"

import AdminCatContext from "../../../contexts/adminContext/adminCatContext"
import AddNewProduct from "./AddNewProduct"

const ProductUpdate = () => {
    const { products } = useContext(AdminCatContext)
    const { pid } = useParams()

    const data = products.filter((item) => item.pid === pid)
    return (
        <div>
            <div
                className="d-flex px-1 py-1 justify-between align-items-center"
                style={{
                    borderBottom: "1px solid var(--white-color-d)",
                    paddingInline: "1.5rem",
                    height: "4.9rem",
                }}
            >
                <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>Products</div>
            </div>
            <div className="py-1 px-1">
                {typeof data[0] === "object" && <AddNewProduct pid={pid} product={data[0]} />}
            </div>
        </div>
    )
}

export default ProductUpdate

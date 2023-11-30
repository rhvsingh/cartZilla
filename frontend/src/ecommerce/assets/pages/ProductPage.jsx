import React from "react"
import { useParams } from "react-router-dom"

const ProductPage = () => {
    const { catName, proName } = useParams()
    return <div>ProductPage {catName + "/" + proName}</div>
}

export default ProductPage

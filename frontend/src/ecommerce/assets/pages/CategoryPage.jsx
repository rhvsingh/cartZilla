import React from "react"
import { useParams } from "react-router-dom"

const CategoryPage = () => {
    const { catName } = useParams()
    console.log(catName)
    return <div>CategoryPage {catName}</div>
}

export default CategoryPage

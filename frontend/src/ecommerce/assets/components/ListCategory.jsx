import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { config } from "../../utils/Constants"
import axios from "axios"

const ListCategory = () => {
    const [catList, setCatList] = useState([])
    useEffect(() => {
        let baseURL = config.url.API_URL
        axios.get(baseURL + "categoryList").then((response) => {
            setCatList(response.data)
        })
    }, [])

    return (
        <div className="mx-1">
            <div className="mb-1 num">Categories</div>
            {catList &&
                catList.length > 0 &&
                catList.map((cat) => (
                    <div style={{ marginBottom: "0.5rem" }}>
                        <Link to={cat}>{cat}</Link>
                    </div>
                ))}
        </div>
    )
}

export default ListCategory

import { useEffect, useState } from "react"
import AdminCatContext from "./adminCatContext"
import axios from "axios"
import { config } from "../../utils/Constants"

const baseURL = config.url.API_URL + "admin/"

const AdminCat = (props) => {
    const [category, setCategory] = useState([])

    function categoryFetcher() {
        const email = localStorage.getItem("email")
        const akey = localStorage.getItem("akey")
        axios.get(baseURL + "category/" + email + "/" + akey).then((response) => {
            setCategory(response.data)
        })
    }

    function updateOneCategory(data) {
        setCategory((oldValue) =>
            oldValue.map((item) =>
                item._id === data.catId
                    ? {
                          ...item,
                          catName: data.catName,
                          catKeyword: data.catKeyword,
                          catDesc: data.catDesc,
                      }
                    : item
            )
        )
    }

    useEffect(() => {
        categoryFetcher()
    }, [])

    return (
        <AdminCatContext.Provider
            value={{ category, setCategory, categoryFetcher, updateOneCategory }}
        >
            {props.children}
        </AdminCatContext.Provider>
    )
}

export default AdminCat

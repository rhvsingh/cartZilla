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

    useEffect(() => {
        categoryFetcher()
    }, [])

    return (
        <AdminCatContext.Provider value={{ category, setCategory, categoryFetcher }}>
            {props.children}
        </AdminCatContext.Provider>
    )
}

export default AdminCat

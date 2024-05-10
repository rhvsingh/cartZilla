import { useEffect, useState } from "react"
import AdminCatContext from "./adminCatContext"
import axios from "axios"
import { config } from "../../utils/Constants"

const baseURL = config.url.API_URL + "admin/"

const Admin = (props) => {
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    function fetchProductDetails() {
        let apiURL

        apiURL = baseURL + "products/"
        axios
            .get(apiURL, {
                params: {
                    email: localStorage.getItem("email"),
                    akey: localStorage.getItem("akey"),
                },
            })
            .then((response) => {
                setProducts(response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

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
        fetchProductDetails()
    }, [])

    return (
        <AdminCatContext.Provider
            value={{
                category,
                setCategory,
                categoryFetcher,
                updateOneCategory,
                products,
                fetchProductDetails,
            }}
        >
            {props.children}
        </AdminCatContext.Provider>
    )
}

export default Admin

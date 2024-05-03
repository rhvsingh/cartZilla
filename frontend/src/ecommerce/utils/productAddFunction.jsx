import axios from "axios"
import { toast } from "react-toastify"

import { config } from "./Constants"

export function addToCart(pid, setTotalCartCount) {
    let baseURL = config.url.API_URL
    let apiURL = baseURL + "addCart/" + localStorage.getItem("akey")
    axios
        .post(apiURL, {
            pid: pid,
            qty: 1,
        })
        .then((response) => {
            if (response.data.result) {
                setTotalCartCount((oldValue) => oldValue + 1)
                toast.info("🦄 Product added to Cart")
            }
        })
}

import React, { useState, useEffect } from "react"
import axios from "axios"

import { config } from "../../utils/Constants"

import CartContext from "./CartContext"

const CartState = (props) => {
    const [cartCount, setCartCount] = useState(-1)
    const [totalCartCount, setTotalCartCount] = useState(0)
    const [tPriceShow, setTPriceShow] = useState(0)
    const [cartDetails, setCartDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const baseURL = config.url.API_URL
        let apiURL = baseURL + "showCart/" + localStorage.getItem("akey")
        axios
            .get(apiURL)
            .then((response) => {
                setCartDetails(response.data.result)
                setIsLoading(false)
            })
            .catch((error) => {
                //console.log(error)
            })
    }, [])

    useEffect(() => {
        const baseURL = config.url.API_URL
        let apiURL = baseURL + "cartCount/" + localStorage.getItem("akey")
        axios
            .get(apiURL)
            .then((response) => {
                setCartCount((old) => {
                    if (old === response.data.count) return old
                    else return response.data.count
                })
                setTotalCartCount((old) => {
                    if (old === response.data.totalQty) return old
                    else return response.data.totalQty
                })
                setTPriceShow((old) => {
                    if (old === response.data.tCalcPrice) return old
                    else return response.data.tCalcPrice
                })
            })
            .catch((error) => {
                //console.log(error)
                //console.error(error)
            })
    }, [totalCartCount, cartDetails])

    return (
        <CartContext.Provider
            value={{
                cartCount,
                totalCartCount,
                setTotalCartCount,
                tPriceShow,
                cartDetails,
                setCartDetails,
                isLoading,
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState

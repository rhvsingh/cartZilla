import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

import { config } from "../../utils/Constants"
import OrderDetails from "../components/profile/order/OrderDetails"

const OrderDetailPage = () => {
    const [orderDetails, setOrderDetails] = useState(null)
    const [loading, setIsLoading] = useState(true)
    const { orderId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const baseURL = config.url.API_URL
        axios
            .get(`${baseURL}user/orders/${orderId}`, {
                params: {
                    email: localStorage.getItem("email"),
                    akey: localStorage.getItem("akey"),
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        setOrderDetails(response.data.data)
                    }
                }
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [orderId])

    useEffect(() => {
        if (!loading) {
            if (!orderDetails) {
                navigate("/")
            }
        }
    }, [loading, navigate, orderDetails])

    return (
        !loading && orderDetails && <OrderDetails orderId={orderId} orderDetails={orderDetails} />
    )
}

export default OrderDetailPage

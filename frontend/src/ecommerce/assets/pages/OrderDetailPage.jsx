import React from "react"
import { useParams } from "react-router-dom"
const OrderDetailPage = () => {
    const params = useParams()
    console.log(params.orderId)
    return <div>OrderDetailPage</div>
}

export default OrderDetailPage

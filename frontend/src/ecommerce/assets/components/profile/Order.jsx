import { useEffect, useState } from "react"
import SEO from "../SEO"
import axios from "axios"

import { config } from "../../../utils/Constants"
import EachOrder from "./order/EachOrder"

const Order = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const baseURL = config.url.API_URL
        let akey = localStorage.getItem("akey")
        let email = localStorage.getItem("email")

        axios
            .get(baseURL + "user/orders/show", {
                params: { email: email, akey: akey },
            })
            .then((response) => {
                if (response.data.status === 200) {
                    setOrders(response.data.data)
                } else {
                    console.log(response)
                }
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <>
            <SEO title={"Orders | Profile | CartZilla"} />
            {orders && orders.length ? (
                <div>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <EachOrder order={order} key={order.order_id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No Order Placed</div>
            )}
        </>
    )
}

export default Order

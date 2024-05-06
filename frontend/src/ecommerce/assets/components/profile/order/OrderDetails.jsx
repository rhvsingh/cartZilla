import OrderDetailImage from "./OrderDetailImage"
import OrderStyles from "../../../pages/orderDetail.module.css"
import SEO from "../../SEO"

const OrderDetails = ({ orderId, orderDetails }) => {
    let buyDate = new Date(orderDetails.order_date + " " + orderDetails.order_time)

    let year = buyDate.getFullYear()
    let month = buyDate.toLocaleString("default", { month: "long" })
    let date = ("0" + buyDate.getDate()).slice(-2)
    let time = buyDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })

    return (
        <div className="px-50 py-25">
            <SEO title={"Order Details | CartZilla"} />
            <div className="mb-1 mt-50">
                <div className={OrderStyles.orderID}>
                    Order ID: <span>{orderId}</span>
                </div>
                <div
                    className={OrderStyles.time}
                >{`Placed on ${month} ${date}, ${year} ${time}`}</div>
            </div>
            <div>
                <table className={OrderStyles.orderTable}>
                    <thead>
                        <tr>
                            <th data-alias="product">Product</th>
                            <th data-alias="price">Price</th>
                            <th data-alias="qty">Quantity</th>
                            <th data-alias="total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.products.map((product) => (
                            <tr key={product.productId}>
                                <td>
                                    <div className={OrderStyles.productImage}>
                                        <OrderDetailImage imageName={product.img} />
                                    </div>
                                    <div data-alias="product-name">{product.name}</div>
                                </td>
                                <td>Rs. {product.productPrice.toLocaleString("en-IN")}</td>
                                <td>{product.productQty}</td>
                                <td>Rs. {product.productTotalPrice.toLocaleString("en-IN")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>Subtotal</td>
                            <td>Rs. {parseFloat(orderDetails.subtotal).toLocaleString("en-IN")}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Shipping (Standard)</td>
                            <td>
                                Rs. {parseFloat(orderDetails.shipping_cost).toLocaleString("en-IN")}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Tax (IGST 18.0%)</td>
                            <td>
                                Rs. {parseFloat(orderDetails.tax_amount).toLocaleString("en-IN")}
                            </td>
                        </tr>
                        <tr className={OrderStyles.total}>
                            <td colSpan={3}>Total</td>
                            <td>
                                Rs. {parseFloat(orderDetails.subtotal).toLocaleString("en-IN")} INR
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex gap-2 mt-1 mb-1">
                <div>
                    <div className={OrderStyles.fw_6 + " mb-25"}>Billing Address</div>
                    <div className={OrderStyles.status}>
                        Payment Method{/*Status*/}:{" "}
                        <span style={{ textTransform: "uppercase" }}>
                            {orderDetails.payment_method}
                        </span>
                    </div>
                    <div className={OrderStyles.address}>
                        {orderDetails.address_shipped.address} <br />
                        {orderDetails.address_shipped.city} {orderDetails.address_shipped.pinCode}{" "}
                        <br />
                        {orderDetails.address_shipped.state} <br />
                        +91{orderDetails.address_shipped.mobNum} <br />
                    </div>
                </div>
                <div>
                    <div className={OrderStyles.fw_6 + " mb-25"}>Shipping Address</div>
                    <div className={OrderStyles.status}>
                        Fulfillment Status: {orderDetails.status}
                    </div>
                    <div className={OrderStyles.address}>
                        {orderDetails.address_shipped.address} <br />
                        {orderDetails.address_shipped.city} {orderDetails.address_shipped.pinCode}{" "}
                        <br />
                        {orderDetails.address_shipped.state} <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails

import OrderDetailImage from "./OrderDetailImage"
import OrderStyles from "../../../pages/orderDetail.module.css"

const OrderDetails = ({ orderId, orderDetails }) => {
    let buyDate = new Date(orderDetails.order_date)

    console.log(buyDate.getMonth())

    return (
        <div className="px-50 py-25">
            <div className="mb-1 mt-50">
                <div>
                    Order ID: <span className={OrderStyles.orderID}>{orderId}</span>
                </div>
                <div>
                    Placed on {orderDetails.order_date} {orderDetails.order_time} January 13,2024
                    01:36AM
                </div>
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
                                    <div>{product.name}</div>
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
                    <div>Billing Address</div>
                    <div>Payment Status: Paid</div>
                    <div>
                        {orderDetails.address_shipped.address} <br />
                        {orderDetails.address_shipped.city}
                        {orderDetails.address_shipped.pinCode} <br />
                        {orderDetails.address_shipped.state} <br />
                        +91{orderDetails.address_shipped.mobNum} <br />
                    </div>
                </div>
                <div>
                    <div>Shipping Address</div>
                    <div>Fulfillment Status: Paid</div>
                    <div>
                        {orderDetails.address_shipped.address} <br />
                        {orderDetails.address_shipped.city}
                        {orderDetails.address_shipped.pinCode} <br />
                        {orderDetails.address_shipped.state} <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails

import CheckoutStyles from "../../pages/checkout.module.css"

const OrderSummary = (props) => {
  return (
    <div className={"order-summary " + CheckoutStyles.orderSummary}>
      <div className={CheckoutStyles.eventButtons}>
        <button className={CheckoutStyles.stepButton}>Place your order</button>
        <div className={CheckoutStyles.disclaimer}>
          By placing your order, you agree to CartZilla's <a>privacy notice</a>
          and <a>conditions of use</a>.
        </div>
      </div>
      <div>
        <h2>Order Summary</h2>
        <div className={CheckoutStyles.summary}>
          <div className="d-flex justify-between">
            <div className={CheckoutStyles.items}>Items:</div>
            <div className={CheckoutStyles.itemsPrice}>
              &#8377;{props.orderDetails.itemsPrice}
            </div>
          </div>
          <div className="d-flex justify-between">
            <div>Delivery:</div>
            <div>&#8377;{props.orderDetails.discountPrice}</div>
          </div>
        </div>
      </div>
      <div className={"d-flex justify-between " + CheckoutStyles.totalAmount}>
        <div>Order Total:</div>
        <div>&#8377;{props.orderDetails.totalPrice}</div>
      </div>
    </div>
  )
}

export default OrderSummary

import CheckoutStyles from "../../pages/checkout.module.css"
import { commaAdder } from "../../../utils/utilityFunctions"

const OrderSummary = (props) => {
    const styles = {
        color: "#3689ba",
    }

    return (
        <div className={"order-summary " + CheckoutStyles.orderSummary}>
            <div className={CheckoutStyles.eventButtons}>
                <button className={CheckoutStyles.stepButton} onClick={props.handleEvent}>
                    {props.stepButtonShow[props.step]}
                </button>
                <div className={CheckoutStyles.disclaimer}>
                    By placing your order, you agree to CartZilla's{" "}
                    <span style={styles}>privacy notice</span> and{" "}
                    <span style={styles}>conditions of use</span>.
                </div>
            </div>
            <div>
                <h2>Order Summary</h2>
                <div className={CheckoutStyles.summary}>
                    <div className="d-flex justify-between">
                        <div className={CheckoutStyles.items}>Items:</div>
                        <div className={CheckoutStyles.itemsPrice}>
                            &#8377;{commaAdder(props.orderDetails.itemsPrice)}
                        </div>
                    </div>
                    <div className="d-flex justify-between">
                        <div>Delivery:</div>
                        <div>&#8377;{commaAdder(props.orderDetails.discountPrice)}</div>
                    </div>
                </div>
            </div>
            <div className={"d-flex justify-between " + CheckoutStyles.totalAmount}>
                <div>Order Total:</div>
                <div>&#8377;{commaAdder(props.orderDetails.totalPrice)}</div>
            </div>
        </div>
    )
}

export default OrderSummary

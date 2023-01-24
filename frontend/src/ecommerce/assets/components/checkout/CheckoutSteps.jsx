import SelectAddress from "./SelectAddress"

import CheckoutStyles from "../../pages/checkout.module.css"

const CheckoutSteps = (props) => {
  return (
    <div className={CheckoutStyles.checkoutSteps}>
      <SelectAddress setOrderDetails={props.setOrderDetails} />
      <br />
      1. Select Delivery Address
      <br />
      2. Select Payment Method
      <br />
      3. Items shown
      <br />
      4. Place Order Button and Total Price
      <div className={CheckoutStyles.eventButtons}>
        <button
          className={CheckoutStyles.stepButton}
          onClick={props.handleEvent}
        >
          {props.stepButtonShow[props.step]}
        </button>
      </div>
    </div>
  )
}

export default CheckoutSteps

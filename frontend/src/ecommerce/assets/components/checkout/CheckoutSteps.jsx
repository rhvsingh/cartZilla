import React from "react"

import CheckoutStyles from "../../pages/checkout.module.css"

const SelectAddress = React.lazy(() => import("./SelectAddress"))
const SelectPayment = React.lazy(() => import("./SelectPayment"))
const SelectItemShow = React.lazy(() => import("./SelectItemShow"))
const SelectSummary = React.lazy(() => import("./SelectSummary"))

const CheckoutSteps = (props) => {
    return (
        <div className={CheckoutStyles.checkoutSteps}>
            <div className={props.step === 0 ? CheckoutStyles.activeComponent : ""}>
                1. Select Delivery Address
                <SelectAddress setOrderDetails={props.setOrderDetails} />
            </div>
            <div className={props.step === 1 ? CheckoutStyles.activeComponent : ""}>
                2. Select Payment Method
                <SelectPayment setOrderDetails={props.setOrderDetails} />
            </div>
            <div className={props.step === 2 ? CheckoutStyles.activeComponent : ""}>
                3. Items shown
                <SelectItemShow setOrderDetails={props.setOrderDetails} />
            </div>
            <div className={props.step === 3 ? CheckoutStyles.activeComponent : ""}>
                4. Place Order Button and Total Price
                <SelectSummary setOrderDetails={props.setOrderDetails} />
            </div>

            <div className={CheckoutStyles.eventButtons}>
                <button className={CheckoutStyles.stepButton} onClick={props.handleEvent}>
                    {props.stepButtonShow[props.step]}
                </button>
            </div>
        </div>
    )
}

export default CheckoutSteps

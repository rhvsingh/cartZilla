import React from "react"

import CheckoutStyles from "../../pages/checkout.module.css"

const SelectAddress = React.lazy(() => import("./SelectAddress"))
const SelectPayment = React.lazy(() => import("./SelectPayment"))
const SelectItemShow = React.lazy(() => import("./SelectItemShow"))
const SelectSummary = React.lazy(() => import("./SelectSummary"))

const CheckoutSteps = (props) => {
    function sectionSwitcher(num) {
        props.setStep(num)
    }
    return (
        <div className={CheckoutStyles.checkoutSteps}>
            <div
                className={
                    props.step === 0
                        ? CheckoutStyles.activeComponent + " my-25 " + CheckoutStyles.stepComponent
                        : CheckoutStyles.notActiveComponent +
                          " my-25 " +
                          CheckoutStyles.stepComponent
                }
            >
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(0)}
                >
                    <div>Select Delivery Address</div>
                    <div>{props.step === 0 ? "-" : "+"}</div>
                </div>
                <SelectAddress setOrderDetails={props.setOrderDetails} />
            </div>
            <div
                className={
                    props.step === 1
                        ? CheckoutStyles.activeComponent + " my-25 " + CheckoutStyles.stepComponent
                        : CheckoutStyles.notActiveComponent +
                          " my-25 " +
                          CheckoutStyles.stepComponent
                }
            >
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(1)}
                >
                    <div>Select Payment Method</div>
                    <div>{props.step === 1 ? "-" : "+"}</div>
                </div>
                <SelectPayment setOrderDetails={props.setOrderDetails} />
            </div>
            <div
                className={
                    props.step === 2
                        ? CheckoutStyles.activeComponent + " my-25 " + CheckoutStyles.stepComponent
                        : CheckoutStyles.notActiveComponent +
                          " my-25 " +
                          CheckoutStyles.stepComponent
                }
            >
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(2)}
                >
                    <div>Items shown</div>
                    <div>{props.step === 2 ? "-" : "+"}</div>
                </div>

                <SelectItemShow setOrderDetails={props.setOrderDetails} />
            </div>
            <div
                className={
                    props.step === 3
                        ? CheckoutStyles.activeComponent + " my-25 " + CheckoutStyles.stepComponent
                        : CheckoutStyles.notActiveComponent +
                          " my-25 " +
                          CheckoutStyles.stepComponent
                }
            >
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(3)}
                >
                    <div>Place Order Button and Total Price</div>
                    <div>{props.step === 3 ? "-" : "+"}</div>
                </div>

                <SelectSummary setOrderDetails={props.setOrderDetails} />
            </div>

            <div className={CheckoutStyles.eventButtons + " mt-1"}>
                <button className={CheckoutStyles.stepButton} onClick={props.handleEvent}>
                    {props.stepButtonShow[props.step]}
                </button>
            </div>
        </div>
    )
}

export default CheckoutSteps

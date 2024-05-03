import React, { useState } from "react"

import CheckoutStyles from "../../pages/checkout.module.css"

const SelectAddress = React.lazy(() => import("./SelectAddress"))
const SelectPayment = React.lazy(() => import("./SelectPayment"))
const SelectItemShow = React.lazy(() => import("./SelectItemShow"))

const selectedRadioStyle = {
    color: "var(--black-color-5)",
    fontWeight: "500",
    fontSize: "0.8rem",
    maxWidth: "400px",
}

const CheckoutSteps = (props) => {
    const [sectionChecked, setSectionChecked] = useState([1, 0, 0])
    const [address, setAddress] = useState({})
    function sectionSwitcher(num) {
        if (num === 0) {
            setSectionChecked((oldValue) => {
                oldValue[0] = 1
                return oldValue
            })
            props.setStep(num)
        }

        if (sectionChecked[num - 1] === 1) {
            setSectionChecked((oldValue) => {
                oldValue[num] = 1
                return oldValue
            })
            props.setStep(num)
        }
    }
    return (
        <div className={CheckoutStyles.checkoutSteps}>
            <div className={"my-25 mb-50 " + CheckoutStyles.stepComponent}>
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(0)}
                >
                    <div>
                        1. {props.step === 0 ? "Select a delivery address" : "Delivery address"}
                    </div>
                    {props.step !== 0 &&
                        sectionChecked[0] === 1 &&
                        props.orderDetails.shippingAddressID !== "" && (
                            <div style={selectedRadioStyle}>
                                {address.name} {address.address}, {address.city}, {address.state},{" "}
                                {address.pinCode}
                            </div>
                        )}
                    <div>{props.step === 0 ? "-" : "+"}</div>
                </div>
                {props.step === 0 && (
                    <SelectAddress
                        orderDetails={props.orderDetails}
                        setOrderDetails={props.setOrderDetails}
                        setAddress={setAddress}
                    />
                )}
            </div>
            <div className={"my-25 mb-50 " + CheckoutStyles.stepComponent}>
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(1)}
                >
                    <div>2. {props.step === 1 ? "Select a payment method" : "Payment method"}</div>
                    {props.step !== 1 &&
                        sectionChecked[1] === 1 &&
                        props.orderDetails.paymentMethodSelected !== "" && (
                            <div style={selectedRadioStyle}>
                                {props.orderDetails.paymentMethodSelected === "cod" &&
                                    "Cash on delivery"}
                            </div>
                        )}
                    <div>{props.step === 1 ? "-" : "+"}</div>
                </div>
                {props.step === 1 && (
                    <SelectPayment
                        orderDetails={props.orderDetails}
                        setOrderDetails={props.setOrderDetails}
                    />
                )}
            </div>
            <div className={"my-25 mb-50 " + CheckoutStyles.stepComponent}>
                <div
                    className={CheckoutStyles.divTitle + " d-flex justify-between my-25"}
                    onClick={() => sectionSwitcher(2)}
                >
                    <div>3. Items shown</div>
                    <div>{props.step === 2 ? "-" : "+"}</div>
                </div>

                {props.step === 2 && (
                    <SelectItemShow
                        orderDetails={props.orderDetails}
                        setOrderDetails={props.setOrderDetails}
                    />
                )}
            </div>
            <div className={CheckoutStyles.eventButtons + " mt-1"}>
                <button
                    className={CheckoutStyles.stepButton}
                    onClick={props.handleEvent}
                    disabled={props.loading}
                >
                    {props.loading ? (
                        <span className={CheckoutStyles.loading}></span>
                    ) : (
                        props.stepButtonShow[props.step]
                    )}
                </button>
            </div>
        </div>
    )
}

export default CheckoutSteps

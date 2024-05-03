import { useEffect } from "react"

import SEO from "../SEO"

const SelectPayment = ({ orderDetails, setOrderDetails }) => {
    useEffect(() => {
        function userDetailsFetcher() {
            if (orderDetails.paymentMethodSelected === "") {
                setOrderDetails((oldValues) => ({
                    ...oldValues,
                    paymentMethodSelected: "cod",
                }))
            }
        }
        userDetailsFetcher()

        return userDetailsFetcher()
    }, [setOrderDetails, orderDetails])

    const changeRadio = (e) => {
        //setSelectedAddress(parseInt(e.target.attributes["data-index"].value))
        /* setOrderDetails((oldValues) => ({
            ...oldValues,
            paymentMethodSelected: "",
        })) */
        /* userDetails.addresses.map(
            (detail) => detail.address_id === e.target.value && setAddress(detail)
        ) */
    }

    return (
        <div
            className="mx-1 px-1 py-50"
            style={{ border: "1px solid var(--white-color-c)", borderRadius: "8px" }}
        >
            <SEO title={"Select Payment Method | CartZilla"} />
            <div
                className="mt-25"
                style={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    paddingBottom: "4px",
                    borderBottom: "1px solid var(--white-color-a)",
                }}
            >
                Payment methods
            </div>
            <div>
                <label
                    className=" mt-50 px-1 py-50 d-flex gap-50 address-radio"
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: "500",
                        color: "#555",
                        borderRadius: "8px",
                        paddingRight: "2rem",
                    }}
                    htmlFor="payment_cod"
                >
                    <div>
                        <input
                            type="radio"
                            name="payment"
                            onChange={changeRadio}
                            value="cod"
                            defaultChecked
                            id="payment_cod"
                        />
                    </div>
                    <div>
                        <span>Pay on delivery (Cash/Card)</span>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default SelectPayment

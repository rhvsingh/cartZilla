import { useState, useEffect } from "react"
import axios from "axios"

import { config } from "../../../utils/Constants"

const SelectAddress = ({ setOrderDetails }) => {
    const [userDetails, setUserDetails] = useState({})
    const [selectedAddress, setSelectedAddress] = useState(0)
    useEffect(() => {
        function userDetailsFetcher() {
            const baseURL = config.url.API_URL
            axios.get(baseURL + "user/" + localStorage.getItem("akey")).then((response) => {
                if (response.data.statusCode === 200) {
                    setUserDetails(response.data.data)
                    setOrderDetails((oldValues) => ({
                        ...oldValues,
                        shippingAddressID: response.data.data.addresses[0].address_id,
                    }))
                }
            })
        }
        userDetailsFetcher()

        return userDetailsFetcher()
    }, [setOrderDetails])

    const changeRadio = (e) => {
        setSelectedAddress(parseInt(e.target.attributes["data-index"].value))
        setOrderDetails((oldValues) => ({
            ...oldValues,
            shippingAddressID: e.target.value,
        }))
    }

    return (
        <div
            className="mx-1 px-1 py-50"
            style={{ border: "1px solid var(--white-color-c)", borderRadius: "8px" }}
        >
            <div
                className="mt-25"
                style={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    paddingBottom: "4px",
                    borderBottom: "1px solid var(--white-color-a)",
                }}
            >
                Your addresses
            </div>
            <div>
                {/* style.css is used here */}
                {userDetails &&
                    userDetails.addresses &&
                    userDetails.addresses.map((address, index) => {
                        return (
                            <label
                                className=" my-1 px-1 py-50 d-flex gap-50 address-radio"
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#555",
                                    borderRadius: "8px",
                                    paddingRight: "2rem",
                                }}
                                key={address.address_id}
                                htmlFor={address.address_id}
                            >
                                <div>
                                    <input
                                        type="radio"
                                        name="address"
                                        onChange={changeRadio}
                                        value={address.address_id}
                                        data-index={index}
                                        checked={index === selectedAddress}
                                        id={address.address_id}
                                    />
                                </div>
                                <div>
                                    {/* <div>{address.addressType}</div>
                                    <div>{address.locality}</div>
                                    <div>{address.mobNum}</div> */}
                                    <span style={{ fontWeight: "600", color: "#000" }}>
                                        {address.name}
                                    </span>{" "}
                                    <span>{address.address}</span>
                                    {", "}
                                    <span style={{ textTransform: "uppercase" }}>
                                        {address.city}
                                    </span>
                                    {", "}
                                    <span style={{ textTransform: "uppercase" }}>
                                        {address.state}
                                    </span>
                                    {", "}
                                    <span>{address.pinCode}</span>
                                </div>
                            </label>
                        )
                    })}
            </div>
        </div>
    )
}

export default SelectAddress

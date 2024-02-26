import React, { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

import SEO from "../SEO"
import ProfileStyle from "../../pages/profile.module.css"

const AddNewAddress = React.lazy(() => import("./address/AddNewAddress"))
const ShowAddresses = React.lazy(() => import("./address/ShowAddresses"))

const Address = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [userDetails, setUserDetails] = useOutletContext()

    return (
        <>
            <SEO title={"Address | Profile"} />
            <div className={ProfileStyle.containerHeading}>Manage Addresses</div>
            <div>
                <div>
                    {isOpen ? (
                        <AddNewAddress setUserDetails={setUserDetails} setIsOpen={setIsOpen} />
                    ) : (
                        <div
                            className={ProfileStyle.addAddressButton + " d-flex align-items-center"}
                            onClick={() => setIsOpen((oldValue) => !oldValue)}
                        >
                            <FaPlus /> Add A New Address
                        </div>
                    )}
                </div>
                <div>
                    <ShowAddresses userDetails={userDetails} setUserDetails={setUserDetails} />
                </div>
            </div>
        </>
    )
}

export default Address

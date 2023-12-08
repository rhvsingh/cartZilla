import { useState, useEffect } from "react"
import axios from "axios"

import { config } from "../../../utils/Constants"

const SelectAddress = (props) => {
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        function userDetailsFetcher() {
            const baseURL = config.url.API_URL
            axios.get(baseURL + "user/" + localStorage.getItem("akey")).then((response) => {
                if (response.data.statusCode === 200) {
                    setUserDetails(response.data.data)
                }
            })
        }
        userDetailsFetcher()

        return userDetailsFetcher()
    }, [])

    return (
        <div className="px-50 py-50">
            SelectAddress
            <div>
                {userDetails &&
                    userDetails.addresses &&
                    userDetails.addresses.map((address) => {
                        return (
                            <div className="mx-1 my-1" key={address.address_id}>
                                <div>{address.name}</div>
                                <div>{address.addressType}</div>
                                <div>{address.address}</div>
                                <div>{address.pinCode}</div>
                                <div>{address.locality}</div>
                                <div>{address.city}</div>
                                <div>{address.state}</div>
                                <div>{address.mobNum}</div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default SelectAddress

import axios from "axios"

import { config } from "../../../../utils/Constants"

import ShowEachAddress from "./ShowEachAddress"

const ShowAddresses = ({ userDetails, setUserDetails }) => {
  const userAddresses = userDetails.addresses

  const baseURL = config.url.API_URL

  const updateAddress = async (addressData) => {
    let newArray = userDetails.addresses.map((addressId) => {
      return addressId.address_id === addressData.address_id
        ? {
            ...addressId,
            name: addressData.name,
            mobNum: addressData.mobNum,
            pinCode: addressData.pinCode,
            locality: addressData.locality,
            address: addressData.address,
            city: addressData.city,
            state: addressData.state,
            addressType: addressData.addressType,
          }
        : addressId
    })
    setUserDetails((oldValue) => {
      return { ...oldValue, addresses: newArray }
    })
  }

  const deleteAddress = async (address_id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this address?"
    )

    if (confirmBox) {
      let newArray = userDetails.addresses.filter(
        (item) => item.address_id !== address_id
      )

      let data = {
        akey: localStorage.getItem("akey"),
        email: localStorage.getItem("email"),
        address_id: address_id,
      }

      await axios
        .post(baseURL + "user/address/delete", data)
        .then((response) => {
          if (response.data.result) {
            setUserDetails((oldValue) => {
              return { ...oldValue, addresses: newArray }
            })
          }
        })
    }
  }

  function ShowAddressesScreen() {
    return userAddresses.map((item) => (
      <ShowEachAddress
        item={item}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
        key={item.address_id}
      />
    ))
  }

  return (
    <div className="address-container">
      {userAddresses && userAddresses.length ? (
        <ShowAddressesScreen />
      ) : (
        "No Addresses"
      )}
    </div>
  )
}

export default ShowAddresses

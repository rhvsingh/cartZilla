import axios from "axios"

import ShowEachAddress from "./ShowEachAddress"

const ShowAddresses = ({ userDetails, setUserDetails }) => {
  const userAddresses = userDetails.addresses

  const baseURL = "http://localhost:4000"

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
        .post(baseURL + "/user/address/delete", data)
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
      <ShowEachAddress item={item} deleteAddress={deleteAddress} />
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

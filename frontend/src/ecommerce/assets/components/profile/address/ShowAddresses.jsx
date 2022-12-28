import { FaEllipsisV } from "react-icons/fa"

const ShowAddresses = ({ userDetails, setUserDetails }) => {
  const userAddresses = userDetails.addresses

  function ShowAddressesScreen() {
    return userAddresses.map((item) => (
      <div className="each-address" key={item.address_id}>
        <div className="d-flex justify-between">
          <div className="address-type">{item.addressType}</div>
          <div>
            <FaEllipsisV />
          </div>
        </div>
        <div className="my-1">
          <span className="sm-b-heading">{item.name}</span>{" "}
          <span className="px-1 sm-b-heading">{item.mobNum}</span>
        </div>
        <span className="address-full-show">
          {item.address}, {item.locality}, {item.city}, {item.state} -{" "}
          <span className="sm-b-heading">{item.pinCode}</span>
        </span>
      </div>
    ))
  }

  return (
    <div className="address-container">
      {userAddresses && <ShowAddressesScreen />}
    </div>
  )
}

export default ShowAddresses

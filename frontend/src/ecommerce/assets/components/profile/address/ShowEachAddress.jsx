import { useState } from "react"
import { FaEllipsisV } from "react-icons/fa"
import EditAddress from "./EditAddress"

const ShowEachAddress = ({ item, updateAddress, deleteAddress }) => {
  const [isEdit, setIsEdit] = useState(false)

  const styles = {
    backgroundColor: isEdit ? "var(--bg-trans-1)" : "inherit",
  }
  return (
    <div className="each-address" style={styles} key={item.address_id}>
      {isEdit ? (
        <EditAddress
          content={item}
          updateAddress={updateAddress}
          setIsOpen={setIsEdit}
        />
      ) : (
        <>
          <div className="d-flex justify-between">
            <div className="address-type">{item.addressType}</div>
            <div className="pos-relative address-menu-option">
              <FaEllipsisV />
              <div className="address-updation">
                <button onClick={() => setIsEdit((oldValue) => !oldValue)}>
                  Edit
                </button>
                <button onClick={() => deleteAddress(item.address_id)}>
                  Delete
                </button>
              </div>
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
        </>
      )}
    </div>
  )
}

export default ShowEachAddress

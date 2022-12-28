import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

import AddNewAddress from "./address/AddNewAddress"
import ShowAddresses from "./address/ShowAddresses"

import ProfileStyle from "../../pages/profile.module.css"

const Address = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [userDetails, setUserDetails] = useOutletContext()

  return (
    <>
      <div className={ProfileStyle.containerHeading}>Manage Addresses</div>
      <div>
        <div>
          {isOpen ? (
            <AddNewAddress setIsOpen={setIsOpen} />
          ) : (
            <div
              className={
                ProfileStyle.addAddressButton + " d-flex align-items-center"
              }
              onClick={() => setIsOpen((oldValue) => !oldValue)}
            >
              <FaPlus /> Add A New Address
            </div>
          )}
        </div>
        <div>
          <ShowAddresses
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
      </div>
    </>
  )
}

export default Address

import { useRef } from "react"
import axios from "axios"

import InputField from "./InputField"

import ProfileStyle from "../../../pages/profile.module.css"

const EditAddress = ({ content, setIsOpen }) => {
  const name = useRef()
  const mobNum = useRef()
  const pinCode = useRef()
  const locality = useRef()
  const address = useRef()
  const city = useRef()
  const state = useRef()
  /* const landmark = useRef()
  const alternatePhoneNumber = useRef() */
  const addressType = useRef()

  function addressTypeChange(e) {
    addressType.current = e.target.value
  }

  async function handleForm(e) {
    e.preventDefault()
    let data = {
      akey: localStorage.getItem("akey"),
      email: localStorage.getItem("email"),
      name: name.current.value,
      mobNum: mobNum.current.value,
      pinCode: pinCode.current.value,
      locality: locality.current.value,
      address: address.current.value,
      city: city.current.value,
      state: state.current.value,
      addressType: addressType.current,
      /* landmark: landmark.current.value,
      alternatePhoneNumber: alternatePhoneNumber.current.value */
    }

    setIsOpen((oldValue) => !oldValue)
  }

  return (
    <form onSubmit={handleForm}>
      <span className={ProfileStyle.addressFormHeading}>Edit Address</span>
      <div style={{ display: "inline-block" }}>
        <div className="d-flex gap-75">
          <InputField
            idName="client_name"
            content={content.name}
            label="name"
            tabIndex={1}
            maxLength={false}
            autoComplete="name"
          />
          <InputField
            idName="phoneNumber"
            content={content.mobNum}
            label="10-digit mobile number"
            tabIndex={2}
            maxLength={10}
            autoComplete="tel"
          />
        </div>
        <div className="d-flex gap-75">
          <div className={ProfileStyle.addressInputContainer}>
            <input
              type="text"
              inputMode="numeric"
              id="address_pincode"
              name="address_pincode"
              autoComplete="postal-code"
              maxLength={6}
              tabIndex={3}
              ref={pinCode}
              value={content.pinCode}
              required
            />
            <label htmlFor="address_pincode">Pincode</label>
          </div>
          <div className={ProfileStyle.addressInputContainer}>
            <input
              type="text"
              id="address_locality"
              name="address_locality"
              ref={locality}
              value={content.locality}
              tabIndex={4}
              required
            />
            <label htmlFor="address_locality">Locality</label>
          </div>
        </div>
        <div className="d-flex gap-75">
          <div className={ProfileStyle.addressInputContainer}>
            <textarea
              id="address_actualAddress"
              name="address_actualAddress"
              ref={address}
              autoComplete="street-address"
              spellCheck={false}
              tabIndex={5}
              required
            >
              {content.address}
            </textarea>
            <label htmlFor="address_actualAddress">
              Address(Area and Street)
            </label>
          </div>
        </div>
        <div className="d-flex gap-75">
          <div className={ProfileStyle.addressInputContainer}>
            <input
              type="text"
              id="address_city"
              autoComplete="on"
              name="address_city"
              ref={city}
              value={content.city}
              tabIndex={6}
              required
            />
            <label htmlFor="address_city">City/District/Town</label>
          </div>
          <div className={ProfileStyle.addressInputContainer}>
            <select
              ref={state}
              defaultValue={"DEFAULT"}
              id="address_state"
              name="address_state"
              tabIndex={7}
              required
            >
              <option value="DEFAULT" disabled>
                --Select State--
              </option>
              <option value="UP">UP</option>
            </select>
            <label htmlFor="address_state">State</label>
          </div>
        </div>
        {/* <div className='d-flex gap-75'>
        <div className={ProfileStyle.addressInputContainer}>
          <input type="text" id='address_landmark' autoComplete="off" ref={landmark} />
          <label htmlFor="address_landmark">Landmark (Optional)</label>
        </div>
        <div className={ProfileStyle.addressInputContainer}>
          <input type="text" id='address_alternate_phone' autoComplete="off" ref={alternatePhoneNumber} />
          <label htmlFor="address_alternate_phone">Alternate Phone (Optional)</label>
        </div>
      </div> */}
        <div>
          <p className={ProfileStyle.radioHeading}>Address Type</p>
          <div
            className={"d-flex gap-50 " + ProfileStyle.radioButtonContainer}
            onChange={addressTypeChange}
          >
            <label htmlFor="address_type_home">
              <input
                type="radio"
                name="address-type"
                id="address_type_home"
                value="Home"
                checked={
                  content.addressType.toLowerCase() === "home" ? true : false
                }
                required
              />
              Home
            </label>
            <label htmlFor="address_type_work">
              <input
                type="radio"
                name="address-type"
                id="address_type_work"
                value="Work"
                checked={
                  content.addressType.toLowerCase() === "work" ? true : false
                }
                required
              />
              Work
            </label>
          </div>
        </div>
      </div>
      <div className={"d-flex gap-2 " + ProfileStyle.formAddressButton}>
        <button type="submit" className={ProfileStyle.saveAddressButton}>
          Save
        </button>
        <button
          type="button"
          className={ProfileStyle.cancleAddressButton}
          onClick={() => {
            setIsOpen((oldValue) => !oldValue)
          }}
        >
          Cancle
        </button>
      </div>
    </form>
  )
}

export default EditAddress

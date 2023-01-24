import { useState } from "react"
import axios from "axios"

import { config } from "../../../../utils/Constants"
import InputField from "./InputField"

import ProfileStyle from "../../../pages/profile.module.css"

const EditAddress = ({ content, updateAddress, setIsOpen }) => {
  const [name, setName] = useState(content.name)
  const [mobNum, setMobNum] = useState(content.mobNum)
  const [pinCode, setPinCode] = useState(content.pinCode)
  const [locality, setLocality] = useState(content.locality)
  const [address, setAddress] = useState(content.address)
  const [city, setCity] = useState(content.city)
  const [state, setState] = useState(content.state)
  /* const landmark = useRef()
  const alternatePhoneNumber = useRef() */
  const [addressType, setAddressType] = useState(content.addressType)

  function addressTypeChange(e) {
    setAddressType(e.target.value)
  }

  const baseURL = config.url.API_URL

  async function handleForm(e) {
    e.preventDefault()
    let data = {
      akey: localStorage.getItem("akey"),
      email: localStorage.getItem("email"),
      address_id: content.address_id,
      name: name,
      mobNum: mobNum,
      pinCode: pinCode,
      locality: locality,
      address: address,
      city: city,
      state: state,
      addressType: addressType,
      /* landmark: landmark.current.value,
      alternatePhoneNumber: alternatePhoneNumber.current.value */
    }
    await axios.post(baseURL + "user/address/update", data).then((response) => {
      if (response.data.result) {
        updateAddress(data)
        setIsOpen((oldValue) => !oldValue)
      }
    })
  }

  return (
    <form onSubmit={handleForm}>
      <span className={ProfileStyle.addressFormHeading}>Edit Address</span>
      <div style={{ display: "inline-block" }}>
        <div className="d-flex gap-75">
          <InputField
            idName="client_name"
            content={name}
            setContent={setName}
            label="name"
            tabIndex={1}
            maxLength="false"
            autoComplete="name"
          />
          <InputField
            idName="phoneNumber"
            content={mobNum}
            setContent={setMobNum}
            label="10-digit mobile number"
            tabIndex={2}
            maxLength={10}
            autoComplete="tel"
          />
        </div>
        <div className="d-flex gap-75">
          <InputField
            idName="pincode"
            content={pinCode}
            setContent={setPinCode}
            label="Pincode"
            tabIndex={3}
            maxLength={6}
            autoComplete="postal-code"
          />
          <InputField
            idName="locality"
            content={locality}
            setContent={setLocality}
            label="Locality"
            tabIndex={4}
            maxLength="false"
            autoComplete="on"
          />
        </div>
        <div className="d-flex gap-75">
          <div className={ProfileStyle.addressInputContainer}>
            <textarea
              id="address_actualAddress"
              name="address_actualAddress"
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              spellCheck={false}
              tabIndex={5}
              value={address}
              required
            ></textarea>
            <label htmlFor="address_actualAddress">
              Address(Area and Street)
            </label>
          </div>
        </div>
        <div className="d-flex gap-75">
          <InputField
            idName="city"
            content={city}
            setContent={setCity}
            label="City/District/Town"
            tabIndex={6}
            maxLength="false"
            autoComplete="on"
          />
          <div className={ProfileStyle.addressInputContainer}>
            <select
              onChange={(e) => setState(e.target.value)}
              defaultValue={state ? state : "DEFAULT"}
              id="address_state"
              name="address_state"
              tabIndex={7}
              required
            >
              <option value="DEFAULT" disabled>
                --Select State--
              </option>
              <option value="Andra-Pradesh">Andra Pradesh</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar-Pradesh">Uttar Pradesh</option>
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
                checked={addressType.toLowerCase() === "home" ? true : false}
                required
                readOnly
              />
              Home
            </label>
            <label htmlFor="address_type_work">
              <input
                type="radio"
                name="address-type"
                id="address_type_work"
                value="Work"
                checked={addressType.toLowerCase() === "work" ? true : false}
                required
                readOnly
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

import React, { useState, useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

import ProfileStyle from '../../pages/profile.module.css'

const Address = () => {
  const [isOpen, setIsOpen] = useState(false)
  const name = useRef()
  const mobNum = useRef()
  const pinCode = useRef()
  const locality = useRef()
  const address = useRef()
  const city = useRef()
  const state = useRef()
  const landmark = useRef()
  const alternatePhoneNumber = useRef()
  const addressType = useRef()

  function addressTypeChange(e) {
    addressType.current = e.target.value
  }

  function handleForm(e) {
    e.preventDefault()
    let data = {
      name: name.current.value,
      mobNum: mobNum.current.value,
      pinCode: pinCode.current.value,
      locality: locality.current.value,
      address: address.current.value,
      city: city.current.value,
      state: state.current.value,
      landmark: landmark.current.value,
      alternatePhoneNumber: alternatePhoneNumber.current.value
    }
    console.log(data)
  }

  function AddAddress() {
    return (
      <form onSubmit={handleForm} className={ProfileStyle.addAddressInputs}>
        <span className={ProfileStyle.addressFormHeading}>Add A New Address</span>
        <div style={{display:'inline-block'}}>
          <div className='d-flex gap-75'>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Name</label>
              <input type="text" ref={name} required />
            </div>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">10-digit mobile number</label>
              <input type="text" ref={mobNum} required />
            </div>
          </div>
          <div className='d-flex gap-75'>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Pincode</label>
              <input type="text" ref={pinCode} required />
            </div>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Locality</label>
              <input type="text" ref={locality} required />
            </div>
          </div>
          <div className='d-flex gap-75'>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Address(Area and Street)</label>
              <textarea name="" id="" ref={address} required></textarea>
            </div>
          </div>
          <div className='d-flex gap-75'>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">City/District/Town</label>
              <input type="text" ref={city} required />
            </div>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">State</label>
              <select ref={state} defaultValue={'DEFAULT'} required>
                <option value="DEFAULT" disabled>--Select State--</option>
                <option value="UP">UP</option>
              </select>
            </div>
          </div>
          <div className='d-flex gap-75'>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Landmark (Optional)</label>
              <input type="text" ref={landmark} />
            </div>
            <div className={ProfileStyle.addressInputContainer}>
              <label htmlFor="">Alternate Phone (Optional)</label>
              <input type="text" ref={alternatePhoneNumber} />
            </div>
          </div>
          <div>
            <p>Address Type</p>
            <div className='d-flex gap-75' onChange={addressTypeChange}>
              <label htmlFor="address_type_home">
                <input type="radio" name='address-type' id='address_type_home' value="Home" required />
                Home
              </label>
              <label htmlFor="address_type_work">
                <input type="radio" name='address-type' id='address_type_work' value="Work" required />
                Work
              </label>
            </div>
          </div>
        </div>
        <div className='d-flex gap-2'>
          <button type='submit'>Save</button>
          <button type='button' onClick={() => {
            setIsOpen(oldValue => !oldValue)
          }}>Cancle</button>
        </div>
      </form>
    )
  }

  return (
    <>
      <div className={ProfileStyle.containerHeading}>
        Manage Addresses
      </div>
      <div>
        <div>
          {isOpen ? <AddAddress /> : <div className={ProfileStyle.addAddressButton + ' d-flex align-items-center'} onClick={() => setIsOpen(oldValue => !oldValue)}><FaPlus /> Add A New Address</div>}
        </div>
        <div>
          Show Addresses
        </div>
      </div>
    </>
  )
}

export default Address
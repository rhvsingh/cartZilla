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
  }

  function AddAddress() {
    return (
      <form onSubmit={handleForm} className={ProfileStyle.addAddressInputs}>
        <span className={ProfileStyle.addressFormHeading}>Add A New Address</span>
        <div>
          <div className='d-flex'>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={name} required />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={mobNum} required />
            </div>
          </div>
          <div className='d-flex'>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={pinCode} required />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={locality} required />
            </div>
          </div>
          <div className='d-flex'>
            <div>
              <textarea name="" id="" ref={address} required></textarea>
              <label htmlFor="">Address(Area and Street)</label>
            </div>
          </div>
          <div className='d-flex'>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={city} required />
            </div>
            <select ref={state} required>
              <option disabled checked>--Select State--</option>
              <option value="UP">UP</option>
            </select>
          </div>
          <div className='d-flex'>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={landmark} required />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" ref={alternatePhoneNumber} required />
            </div>
          </div>
          <div>
            <p>Address Type</p>
            <div className='d-flex' onChange={addressTypeChange}>
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
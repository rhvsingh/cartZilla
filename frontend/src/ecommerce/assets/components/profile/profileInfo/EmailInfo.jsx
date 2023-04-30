import React, { useState } from "react"

import ProfileStyle from "../../../pages/profile.module.css"

const EmailInfo = ({ userDetails, setUserDetails }) => {
  const [disabled, setDisabled] = useState(true)
  const [email, setEmail] = useState(userDetails.email)

  function editSwitcher() {
    setDisabled((oldValue) => !oldValue)
  }

  function cancelSwitcher() {
    setEmail(userDetails.email)
    setDisabled((oldValue) => !oldValue)
  }

  function changeData(e) {
    setEmail(e.target.value)
  }

  function submitButton() {
    setUserDetails((oldInfo) => {
      return { ...oldInfo, email: email }
    })
    setDisabled(true)
  }

  return (
    <div className={ProfileStyle.marginBottom}>
      <div className={ProfileStyle.containerHeading}>
        Email Address
        {disabled ? (
          <button onClick={editSwitcher}>Edit</button>
        ) : (
          <button onClick={cancelSwitcher}>Cancle</button>
        )}
      </div>
      <div
        className={
          ProfileStyle.formFields +
          " d-flex align-items-center gap-1 flex-wrap-wrap"
        }
      >
        <input
          type="email"
          id="personal_info_email"
          onChange={changeData}
          value={email}
          disabled={disabled}
          required
        />
        <label htmlFor="personal_info_email">Email</label>
        {!disabled && (
          <button disabled={disabled} onClick={submitButton}>
            Save
          </button>
        )}
      </div>
    </div>
  )
}

export default EmailInfo

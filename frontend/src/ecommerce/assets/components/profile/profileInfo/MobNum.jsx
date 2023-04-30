import { useState } from "react"
import axios from "axios"

import { config } from "../../../../utils/Constants"

import ProfileStyle from "../../../pages/profile.module.css"

const MobNum = ({ userDetails }) => {
  const [disabled, setDisabled] = useState(true)
  const [mobileNumber, setMobileNumber] = useState(userDetails.mobNum)

  const baseURL = config.url.API_URL

  function editSwitcher() {
    setDisabled((oldValue) => !oldValue)
  }

  function cancelSwitcher() {
    setMobileNumber(userDetails.mobNum)
    setDisabled((oldValue) => !oldValue)
  }

  function changeData(e) {
    let regex1 = /^\d{10}$/
    let regex2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    let regex3 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    if (
      e.target.value.match(regex1) ||
      e.target.value.match(regex2) ||
      e.target.value.match(regex3)
    ) {
    }
    setMobileNumber(e.target.value)
  }

  async function submitButton() {
    let data = { mobNum: mobileNumber, akey: localStorage.getItem("akey") }
    await axios.post(baseURL + "user/update", data).then((response) => {
      console.log(response.data)
    })
    /* setUserDetails(oldInfo => {
            return { ...oldInfo, mobNum: mobileNumber }
        }) */
    setDisabled(true)
  }

  return (
    <div className={ProfileStyle.marginBottom}>
      <div className={ProfileStyle.containerHeading}>
        Mobile Number
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
          type="text"
          id="personal_info_mobNum"
          onChange={changeData}
          value={mobileNumber}
          disabled={disabled}
        />
        <label htmlFor="personal_info_mobNum">Mobile Number</label>
        {!disabled && (
          <button disabled={disabled} onClick={submitButton}>
            Save
          </button>
        )}
      </div>
    </div>
  )
}

export default MobNum

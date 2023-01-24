import { useState } from "react"
import axios from "axios"

import { config } from "../../../../utils/Constants"

import ProfileStyle from "../../../pages/profile.module.css"

const PersonalInfo = ({ userDetails }) => {
  const [disabled, setDisabled] = useState(true)
  const [nameGen, setNameGen] = useState({
    name: userDetails.name,
    gender: userDetails.gender,
  })

  const baseURL = config.url.API_URL

  function editSwitcher() {
    setDisabled((oldValue) => !oldValue)
  }

  function cancelSwitcher() {
    setNameGen({
      name: userDetails.name,
      gender: userDetails.gender,
    })
    setDisabled((oldValue) => !oldValue)
  }

  function changeData(e) {
    setNameGen((oldValue) => ({ ...oldValue, name: e.target.value }))
  }

  function onChangeRadio(e) {
    setNameGen((oldValue) => ({ ...oldValue, gender: e.target.value }))
  }

  async function submitButton() {
    let data = { ...nameGen, akey: localStorage.getItem("akey") }
    await axios.post(baseURL + "user/update", data).then((response) => {
      console.log(response.data)
    })

    /* setUserDetails(oldInfo => {
            return { ...oldInfo, name: nameGen.name, gender: nameGen.gender }
        }) */
    setDisabled(true)
  }

  function RadioButtonsShow({ disabled, gender }) {
    return (
      <div
        className={"my-1 " + ProfileStyle.radioButtonContainer}
        onChange={onChangeRadio}
      >
        <label htmlFor="male_radio_button">
          <input
            type="radio"
            name="gender"
            value="male"
            id="male_radio_button"
            defaultChecked={gender === "male" && true}
            disabled={disabled}
          />
          Male
        </label>
        <label htmlFor="female_radio_button">
          <input
            type="radio"
            name="gender"
            value="female"
            id="female_radio_button"
            defaultChecked={gender === "female" && true}
            disabled={disabled}
          />
          Female
        </label>
      </div>
    )
  }

  return (
    <div className={ProfileStyle.marginBottom}>
      <div className={ProfileStyle.containerHeading}>
        Personal Information
        {disabled ? (
          <button onClick={editSwitcher}>Edit</button>
        ) : (
          <button onClick={cancelSwitcher}>Cancle</button>
        )}
      </div>
      <div
        className={ProfileStyle.formFields + " d-flex align-items-center gap-1"}
      >
        <input
          type="text"
          id="personal_info_name"
          onChange={changeData}
          value={nameGen.name}
          disabled={disabled}
          required
        />
        <label htmlFor="personal_info_name">Name</label>
        {!disabled && (
          <button disabled={disabled} onClick={submitButton}>
            Save
          </button>
        )}
      </div>
      <div>
        Your Gender
        <br />
        {nameGen.gender === "" ? (
          <RadioButtonsShow disabled={disabled} />
        ) : (
          <RadioButtonsShow disabled={disabled} gender={nameGen.gender} />
        )}
      </div>
    </div>
  )
}

export default PersonalInfo

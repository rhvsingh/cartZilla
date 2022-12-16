import React, { useState } from 'react'

import ProfileStyle from '../../../pages/profile.module.css'

/* Personal Information Component */

export const PersonalInfo = ({ userDetails, setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)
    const [nameGen, setNameGen] = useState({
        name: userDetails.name,
        gender: userDetails.gender
    })

    console.log(userDetails)

    function editSwitcher() {
        setDisabled(oldValue => !oldValue)
    }

    function cancelSwitcher() {
        setNameGen({
            name: userDetails.name,
            gender: userDetails.gender
        })
        setDisabled(oldValue => !oldValue)
    }

    function changeData(e) {
        setNameGen(oldValue => ({...oldValue, name: e.target.value}))
    }

    function submitButton() {
        /* setUserDetails(oldInfo => {
            return { ...oldInfo, mobNum: mobileNumber}
        }) */
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Personal Information
                {disabled ? <button onClick={editSwitcher}>Edit</button> : <button onClick={cancelSwitcher}>Cancle</button>}
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="text" id='personal_info_name' onChange={changeData} value={nameGen.name} disabled={disabled} required />
                <label htmlFor='personal_info_name'>Name</label>
                {!disabled && <button disabled={disabled} onClick={submitButton}>Save</button>}
            </div>
            <div>
                Your Gender
                <br />
                {userDetails.gender === '' ? 'Select any radio button' : userDetails.gender === 'male' ? 'male' : 'female'}

            </div>
        </div>
    )
}

/* Email Component */

export const EmailInfo = ({ userDetails, setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)
    const [email, setEmail] = useState(userDetails.email)

    function editSwitcher() {
        setDisabled(oldValue => !oldValue)
    }

    function cancelSwitcher() {
        setEmail(userDetails.email)
        setDisabled(oldValue => !oldValue)
    }

    function changeData(e) {
        setEmail(e.target.value)
    }

    function submitButton() {
        setUserDetails(oldInfo => {
            return { ...oldInfo, email: email }
        })
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Email Address
                {disabled ? <button onClick={editSwitcher}>Edit</button> : <button onClick={cancelSwitcher}>Cancle</button>}
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="email" id='personal_info_email' onChange={changeData} value={email} disabled={disabled} required />
                <label htmlFor='personal_info_email'>Email</label>
                {!disabled && <button disabled={disabled} onClick={submitButton}>Save</button>}
            </div>
        </div>
    )
}

/* Mobile Number Component */

export const MobNum = ({ userDetails, setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)

    const [mobileNumber, setMobileNumber] = useState(userDetails.mobNum)

    function editSwitcher() {
        setDisabled(oldValue => !oldValue)
    }

    function cancelSwitcher() {
        setMobileNumber(userDetails.mobNum)
        setDisabled(oldValue => !oldValue)
    }

    function changeData(e) {
        let regex1 = /^\d{10}$/;
        let regex2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let regex3 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (e.target.value.match(regex1) || e.target.value.match(regex2) || e.target.value.match(regex3)) {
            setMobileNumber(e.target.value)
        }
    }

    function submitButton() {
        setUserDetails(oldInfo => {
            return { ...oldInfo, mobNum: mobileNumber }
        })
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Mobile Number
                {disabled ? <button onClick={editSwitcher}>Edit</button> : <button onClick={cancelSwitcher}>Cancle</button>}
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="text" id='personal_info_mobNum' onChange={changeData} value={mobileNumber} disabled={disabled} />
                <label htmlFor='personal_info_mobNum'>Mobile Number</label>
                {!disabled && <button disabled={disabled} onClick={submitButton}>Save</button>}
            </div>
        </div>
    )
}
import React, { useState } from 'react'

import ProfileStyle from '../../../pages/profile.module.css'

const MobNum = ({ userDetails, setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)

    const [mobileNumber, setMobileNumber] = useState(userDetails.mobNum)

    console.log(userDetails.mobNum)

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
        if(e.target.value.match(regex1) || e.target.value.match(regex2) || e.target.value.match(regex3)){
            
        }
        setMobileNumber(e.target.value)
    }

    function submitButton() {
        setUserDetails(oldInfo => {
            return { ...oldInfo, mobNum: mobileNumber}
        })
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Mobile Number
                {disabled ? <button onClick={editSwitcher}>Edit</button> : <button onClick={cancelSwitcher}>cancle</button>}
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="text" id='personal_info_mobNum' onChange={changeData} value={mobileNumber} disabled={disabled} />
                <label htmlFor='personal_info_mobNum'>Mobile Number</label>
                {!disabled && <button disabled={disabled} onClick={submitButton}>Save</button>}
            </div>
        </div>
    )
}

export default MobNum
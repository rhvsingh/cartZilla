import React, { useState } from 'react'

import ProfileStyle from '../../../pages/profile.module.css'

const PersonalInfo = ({ userDetails,setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)

    function editSwitcher() {
        setDisabled(oldValue => !oldValue)
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Personal Information
                <button onClick={editSwitcher}>{disabled ? 'Edit' : 'Cancle'}</button>
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="text" id='personal_info_name' value={userDetails.name} readOnly disabled={disabled} />
                <label htmlFor='personal_info_name'>Name</label>
                {!disabled && <button disabled={disabled}>Save</button>}
            </div>
            <div>
                Your Gender 
                <br />
                {userDetails.gender === '' ? 'Select any radio button' : userDetails.gender === 'male' ? 'male' : 'female'}

            </div>
        </div>
    )
}

export default PersonalInfo
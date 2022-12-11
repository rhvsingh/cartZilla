import React, {useState} from 'react'

import ProfileStyle from '../../../pages/profile.module.css'

const EmailInfo = ({ userDetails,setUserDetails }) => {

    const [disabled, setDisabled] = useState(true)

    function editSwitcher() {
        setDisabled(oldValue => !oldValue)
    }

    return (
        <div className={ProfileStyle.marginBottom}>
            <div className={ProfileStyle.containerHeading}>
                Email Address
                <button onClick={editSwitcher}>{disabled ? 'Edit' : 'Cancle'}</button>
            </div>
            <div className={ProfileStyle.formFields + ' d-flex align-items-center gap-1'}>
                <input type="email" id='personal_info_email' value={userDetails.email} readOnly disabled={disabled} />
                <label htmlFor='personal_info_email'>Email</label>
                {!disabled && <button disabled={disabled}>Save</button>}
            </div>
        </div>
    )
}

export default EmailInfo
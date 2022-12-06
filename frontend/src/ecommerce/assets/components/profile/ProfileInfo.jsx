import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ProfileStyle from '../../pages/profile.module.css'

const ProfileInfo = () => {

    const [userDetails, setUserDetails] = useState([])

    async function getUserDetails() {
        await axios.get(`http://localhost:4000/user/${localStorage.getItem('akey')}`).then(response => {
            let data = response.data
            if (data.result === false && data.statusCode === 404) {
                console.log('User not authorized')
            } else {
                setUserDetails(data.data)
            }
        })
    }
    useEffect(() => {
        getUserDetails()
    }, [])

    function UserInfoShow() {
        return (
            <div>
                <div className={ProfileStyle.marginBottom}>
                    <div>
                        Personal Information
                        <button>Edit</button>
                    </div>
                    <div>
                        <input type="text" value={userDetails.name} readOnly />
                    </div>
                    <div>
                        Your Gender
                        {userDetails.gender === '' ? 'Select any radio button' : userDetails.gender === 'male' ? 'male' : 'female'}

                    </div>
                </div>
                <div className={ProfileStyle.marginBottom}>
                    <div>
                        Email Address
                        <button>Edit</button>
                    </div>
                    <div>
                        <input type="email" value={userDetails.email} readOnly />
                    </div>
                </div>
                <div className={ProfileStyle.marginBottom}>
                    <div>
                        Mobile Number
                        <button>Edit</button>
                    </div>
                    <div>
                        <input type="text" value={userDetails.mobNum} readOnly />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {userDetails && <UserInfoShow />}
        </div>
    )
}

export default ProfileInfo
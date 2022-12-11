import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PersonalInfo from './profileInfo/PersonalInfo'
import EmailInfo from './profileInfo/EmailInfo'
import MobNum from './profileInfo/MobNum'

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
            <>
                <PersonalInfo userDetails={userDetails} setUserDetails={setUserDetails} />
                <EmailInfo userDetails={userDetails} setUserDetails={setUserDetails} />
                <MobNum userDetails={userDetails} setUserDetails={setUserDetails} />
            </>
        )
    }

    return (
        <>
            {userDetails && <UserInfoShow />}
        </>
    )
}

export default ProfileInfo
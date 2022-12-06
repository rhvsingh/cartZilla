import React from 'react'
import { Link, Outlet, useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import ProfileInfo from '../components/profile/ProfileInfo'

import ProfileStyles from './profile.module.css'


const Profile = ({ auth }) => {

    const outlet = useOutlet()
    const navigate = useNavigate()
    const endPoint = useLocation().pathname.split('/').at(-1)

    return (
        <div className='container-2'>
            <HelmetProvider>
                <Helmet>
                    <title>Profile</title>
                </Helmet>
            </HelmetProvider>
            <div className={'d-flex gap-2 ' + ProfileStyles.profileContainer}>
                <aside>
                    <div className={'px-1 py-1 ' + ProfileStyles.sideBarBox}>
                        Hello,<br />
                        Raja Harsh Vardhan Singh
                    </div>
                    <div className={'px-1 py-1 ' + ProfileStyles.sideBarBox}>
                        <div>
                            Account Settings
                            <ul>
                                <li><Link to="/profile" relative="route" className={endPoint === 'profile' ? 'child-selector active-child' : 'child-selector'}>Profile Information</Link></li>
                                <li><Link to="address" className={endPoint === 'address' ? 'child-selector active-child' : 'child-selector'}>Manage Addresses</Link></li>
                            </ul>
                        </div>
                        <div></div>
                        <div></div>
                        <div>
                            <li onClick={() => auth(oldValue => {
                                if (oldValue === true) {
                                    localStorage.clear()
                                    navigate('/')
                                }
                                return !oldValue
                            })}>Logout</li></div>
                    </div>
                    <div className={'px-1 py-1 ' + ProfileStyles.sideBarBox}>
                        Frequently Visited:
                        <li>Change Password</li>
                        <li>Track Order</li>
                        <li>Help Center</li>
                    </div>
                </aside>
                <div className={ProfileStyles.profileContent}>
                    {outlet ? <Outlet /> : <ProfileInfo />}
                </div>
            </div>
        </div>
    )
}

export default Profile
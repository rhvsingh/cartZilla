import { useEffect, useState, Suspense } from "react"
import {
  Link,
  Outlet,
  useOutlet,
  useLocation,
  useNavigate,
} from "react-router-dom"
import axios from "axios"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { FaUserAlt, FaPowerOff } from "react-icons/fa"

import ProfileInfo from "../components/profile/ProfileInfo"
import LoadingScreen from "../components/LoadingScreen"

import ProfileStyles from "./profile.module.css"
import "./profile.css"

import MaleProfilePic from "../components/profile/profile-pic-male.svg"
import FemaleProfilePic from "../components/profile/profile-pic-female.svg"

const Profile = ({ auth }) => {
  const outlet = useOutlet()
  const navigate = useNavigate()
  const endPoint = useLocation().pathname.split("/").at(-1)

  const [userDetails, setUserDetails] = useState([])

  async function getUserDetails() {
    await axios
      .get(`http://localhost:4000/user/${localStorage.getItem("akey")}`)
      .then((response) => {
        let data = response.data
        if (data.result === false && data.statusCode === 404) {
          console.log("User not authorized")
        } else {
          setUserDetails(data.data)
        }
      })
  }
  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="container-2">
      <HelmetProvider>
        <Helmet>
          <title>Profile</title>
        </Helmet>
      </HelmetProvider>
      <div className={"d-flex gap-1 " + ProfileStyles.profileContainer}>
        <aside>
          <div
            className={`${ProfileStyles.sideBarBox} ${ProfileStyles.userBox} d-flex align-items-center gap-1`}
          >
            <div>
              {userDetails.gender === "male" ? (
                <img src={MaleProfilePic} alt="Male" />
              ) : userDetails.gender === "female" ? (
                <img src={FemaleProfilePic} alt="Female" />
              ) : (
                <div className={ProfileStyles.noProfile}>
                  <FaUserAlt />
                </div>
              )}
            </div>
            <div>
              <span className={ProfileStyles.welcome}>Hello,</span>
              <br />
              <span className={ProfileStyles.username}>{userDetails.name}</span>
            </div>
          </div>
          <div className={ProfileStyles.sideBarBox}>
            <div className="border-bottom">
              <div className={"d-flex flex-wrap-wrap " + ProfileStyles.header}>
                <FaUserAlt />
                <div className={ProfileStyles.headerHeading}>
                  Account Settings
                </div>
              </div>
              <ul>
                <Link
                  to="/profile"
                  relative="route"
                  className={
                    endPoint === "profile"
                      ? "child-selector active-child"
                      : "child-selector"
                  }
                >
                  <li>Profile Information</li>
                </Link>
                <Link
                  to="address"
                  className={
                    endPoint === "address"
                      ? "child-selector active-child"
                      : "child-selector"
                  }
                >
                  <li>Manage Addresses</li>
                </Link>
              </ul>
            </div>
            {/* <div className='border-bottom'></div>
                        <div className='border-bottom'></div> */}
            <div className="border-bottom">
              <div
                className={`d-flex flex-wrap-wrap ${ProfileStyles.logoutButton} ${ProfileStyles.header}`}
                onClick={() =>
                  auth((oldValue) => {
                    if (oldValue === true) {
                      localStorage.clear()
                      navigate("/")
                    }
                    return !oldValue
                  })
                }
              >
                <FaPowerOff />
                <div className={ProfileStyles.headerHeading}>Logout</div>
              </div>
            </div>
          </div>
          <div className={ProfileStyles.sideBarBox}>
            <h6 className={ProfileStyles.smallHeading}>Frequently Visited:</h6>
            <ul
              className={"d-flex flex-wrap-wrap " + ProfileStyles.smallFontList}
            >
              <li>Change Password</li>
              <li>Track Order</li>
              <li>Help Center</li>
            </ul>
          </div>
        </aside>
        <div className={ProfileStyles.profileContent}>
          {outlet ? (
            <Suspense fallback={<LoadingScreen />}>
              <Outlet context={[userDetails, setUserDetails]} />
            </Suspense>
          ) : (
            <ProfileInfo />
          )}
        </div>
      </div>
    </div>
  )
}

/* function wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    } */

export default Profile

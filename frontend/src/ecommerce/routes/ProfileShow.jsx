import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import Profile from "../assets/pages/Profile"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const Profile = React.lazy(() => import("../assets/pages/Profile"))

const ProfileShow = ({ isAuth, setIsAuth }) => {
    return (
        <LayoutSuspense>
            <Profile isAuth={isAuth} setIsAuth={setIsAuth} />
        </LayoutSuspense>
    )
}

export default ProfileShow

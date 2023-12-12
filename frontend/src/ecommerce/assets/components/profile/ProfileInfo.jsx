import { lazy } from "react"

const PersonalInfo = lazy(() => import("./profileInfo/PersonalInfo"))
const EmailInfo = lazy(() => import("./profileInfo/EmailInfo"))
const MobNum = lazy(() => import("./profileInfo/MobNum"))

const ProfileInfo = ({ userDetails, setUserDetails }) => {
    function UserInfoShow() {
        return (
            <>
                <PersonalInfo userDetails={userDetails} />
                <EmailInfo userDetails={userDetails} setUserDetails={setUserDetails} />
                <MobNum userDetails={userDetails} />
            </>
        )
    }

    return <>{userDetails && <UserInfoShow />}</>
}

export default ProfileInfo

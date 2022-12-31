import PersonalInfo from "./profileInfo/PersonalInfo"
import EmailInfo from "./profileInfo/EmailInfo"
import MobNum from "./profileInfo/MobNum"

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

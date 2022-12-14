import React, {
  useState
} from 'react'
import PasswordChange from '../../component/other/Dashboard/Profile/PasswordChange'
import ProfileDetails from '../../component/other/Dashboard/Profile/ProfileDetails'
import ProfileLayout from '../../component/other/Dashboard/Profile/ProfileLayout'
import profileStyle from "./Profile.module.css"

const Profile = () => {
  const [show, setShow] = useState ("details") //default profile details will be show
  return (
    <div className = {`${profileStyle.profilePartWrapper}`}>
      <ProfileLayout setShow = {setShow} show = {show}>
          {
            show == "details"
            &&
            <div className = {`p-3`}>
              <ProfileDetails/>
            </div>
          }

          {
            show == "passwordChange"
            &&
            <div className = {`p-3`}>
              <PasswordChange/>
          </div>
          }
      </ProfileLayout>
    </div>
  )
}

export default Profile
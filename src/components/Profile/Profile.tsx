import { FC } from 'react'
import { ProfileType } from '../../types/types'
import MyPostsContainer from './MyPosts/MyPostsContainer'
// import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
type PropsType = {
  isOwner: boolean
  profile: ProfileType| null 
  status: string
  updateStatus:  (text: string) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => Promise<boolean>
}
const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
        updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
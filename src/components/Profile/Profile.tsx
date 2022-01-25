import { FC } from 'react'
import { ProfileType } from '../../types/types'
import MyPostsContainer from './MyPosts/MyPostsContainer'
// import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
type PropsType = {
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: (formData: any) => Promise<boolean>

}
const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
        updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
      <MyPostsContainer addPost={function (text: string, postId: number): void {
        throw new Error('Function not implemented.')
      }} deletePost={function (postId: number): void {
        throw new Error('Function not implemented.')
      }} />
    </div>
  )
}

export default Profile
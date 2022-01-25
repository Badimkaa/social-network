import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import Profile from './Profile'

type PropsType = {
  match: any
  authorizedUserId: number
  history: any
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: (formData:any) => Promise<boolean>

}
class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile()
  }

  render() {
    return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
  }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id
  }
}
type MapStatePropsType = {
  profile: ProfileType | null
  isAuth: boolean
  status: string | null
  authorizedUserId: number | null
}
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: () => void
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: () => void
}
export default compose(connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer)
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// export default connect(mapStateToProps, { getUserProfile })(withUrlDataContainerComponent)
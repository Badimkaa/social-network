import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import Profile from './Profile'

type MapStatePropsType = ReturnType<typeof mapStateToProps>
// type MapStatePropsType = {
//   profile: ProfileType 
//   isAuth: boolean
//   status: string 
//   authorizedUserId: number 
// }

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (text: string) => void
  savePhoto: (file: File) => void
  saveProfile: (formData: ProfileType) => Promise<boolean>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId as number)
    this.props.getStatus(userId as number)
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
let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status as string ,
    authorizedUserId: state.auth.id
  }
}

export default compose<ComponentType>(connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer)
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// export default connect(mapStateToProps, { getUserProfile })(withUrlDataContainerComponent)
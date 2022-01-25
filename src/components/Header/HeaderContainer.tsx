import React from 'react';
import Header from './Header';
import { setAuthUserPhoto, logout } from '../../redux/auth-reduceer';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
type MapStatePropsType = {
    isAuth: boolean
    photos: string | null
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void

}
type PropsType = MapDispatchPropsType & MapStatePropsType
class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
} let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        photos: state.auth.photos
    }
}
export default connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, { logout })(HeaderContainer);
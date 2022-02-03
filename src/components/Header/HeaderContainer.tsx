import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';
type MapStatePropsType = {
    isAuth: boolean
    photos: string
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
        photos: state.auth.photos as string
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);
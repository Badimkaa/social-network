import { Redirect } from 'react-router'
import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}
type MapPropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const  RedirectComponent:React.FC< MapDispatchPropsType & MapPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='login' />
        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType,MapDispatchPropsType,WCP,AppStateType>(mapStateToPropsForRedirect,{})(RedirectComponent)
    return ConnectedAuthRedirectComponent
}
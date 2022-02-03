import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api"
import { authAPI } from "../api/authAPI"
import { profileAPI } from "../api/profileAPI"
import { securityAPI } from "../api/securityAPI"
import userPhoto from '../assets/images/user.png'
import { BaseThunkType, InferActionTypes } from "./redux-store"
const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_AUTH_USER_PHOTO = 'auth/SET_AUTH_USER_PHOTO'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

type InitialStatetype = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    photos: null as string | null
}
const authReducer = (state: InitialStatetype = initialState, action: ActionsType): InitialStatetype => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        case SET_AUTH_USER_PHOTO:
            return {
                ...state,
                photos: action.smallPhoto
            }
        default: return state
    }
}
export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return { type: SET_USER_DATA, payload: { id, email, login, isAuth } } as const
    },
    setAuthUserPhoto: (smallPhoto: string | null) => {
        return { type: SET_AUTH_USER_PHOTO, smallPhoto } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return { type: GET_CAPTCHA_URL, payload: { captchaUrl } } as const
    }
}

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.me()
        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = data.data
            dispatch(actions.setAuthUserData(id, email, login, true))
            let data_1 = await profileAPI.getProfile(id)
            dispatch(actions.setAuthUserPhoto(data_1.photos.small || userPhoto))
        }
    }
}
export default authReducer

export const login = (login: string, password: string, rememberMe: boolean = false,
    captcha: any = null): ThunkType => async (dispatch) => {
        let data = await authAPI.login(login, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
                dispatch(actions.getCaptchaUrlSuccess(captcha))
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
        dispatch(actions.setAuthUserPhoto(null))
    }
}
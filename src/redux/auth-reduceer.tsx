import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { authAPI, profileAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI } from "../api/api"
import userPhoto from '../assets/images/user.png'
import { AppStateType } from "./redux-store"
const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_AUTH_USER_PHOTO = 'auth/SET_AUTH_USER_PHOTO'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    photos: null as string | null

}

type InitialStatetype = typeof initialState
type ActionTypes = setAuthUserDataActionType | setAuthUserPhotoActionType |
    getCaptchaUrlSuccessActionType
const authReducer = (state: InitialStatetype = initialState, action: ActionTypes): InitialStatetype => {
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
type setAuthUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => {
    return { type: SET_USER_DATA, payload: { id, email, login, isAuth } }
}
type setAuthUserPhotoActionType = {
    type: typeof SET_AUTH_USER_PHOTO,
    smallPhoto: string | null
}
export const setAuthUserPhoto = (smallPhoto: string | null): setAuthUserPhotoActionType => {
    return { type: SET_AUTH_USER_PHOTO, smallPhoto }
}
type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL,
    payload: {
        captchaUrl: string
    }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => {
    return { type: GET_CAPTCHA_URL, payload: { captchaUrl } }
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.me()
        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = data.data
            dispatch(setAuthUserData(id, email, login, true))
            let data_1 = await profileAPI.getProfile(id)
            dispatch(setAuthUserPhoto(data_1.photos.small || userPhoto))
        }
    }
}
export default authReducer

export const login = (login: string, password: string, rememberMe: boolean = false,
    captcha: any = null): ThunkType => async (dispatch: any) => {
        let data = await authAPI.login(login, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
                dispatch(getCaptchaUrlSuccess(captcha))
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
        dispatch(setAuthUserPhoto(null))
    }
}
import { Dispatch } from "redux"
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { profileAPI, ResultCodesEnum, usersAPI } from "../api/api"
import { PhotosType, PostsType, ProfileType } from "../types/types"
import { AppStateType } from "./redux-store"

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: 'Hello my friends!', likesCount: 5 },
        { id: 2, message: 'It\'s my first project', likesCount: 4 }
    ] as Array<PostsType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: null as string | null
}
type InitialStateType = typeof initialState
type ActionTypes = SetStatusActionType | SetUserProfileActionType |
    DeletePostActionType | SavePhotoSuccessActionType | AddPostActionCreatorActionType
const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: action.postId,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => {
                    return p.id !== action.postId
                })
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }
        default: return state
    }
}

//actioncreators
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
    postId: number
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const addPostActionCreator = (newPostText: string, postId: number): AddPostActionCreatorActionType => {
    return {
        type: ADD_POST, newPostText, postId
    }
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
//thunkcreators
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status))
        }
    }
}
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoSuccess(response.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }))
        return Promise.reject(response.messages[0])
    }
}
export default profileReducer
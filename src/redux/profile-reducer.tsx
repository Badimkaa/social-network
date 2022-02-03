import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum } from "../api/api"
import { profileAPI } from "../api/profileAPI"
import { PhotosType, PostsType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionTypes } from "./redux-store"

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
    profile: null as ProfileType | null,
    status: null as string | null
}
type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
export const actions = {
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
    addPostActionCreator: (newPostText: string, postId: number) => ({ type: ADD_POST, newPostText, postId } as const)
}
type ThunkType = BaseThunkType<ActionsType | FormAction>
//thunkcreators
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status))
        }
    }
}
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(response.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)

    if (response.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId cant be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }))
        return Promise.reject(response.messages[0])
    }
}
export default profileReducer
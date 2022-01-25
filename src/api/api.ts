import axios from "axios"
import { PhotosType, ProfileType, UserType } from "../types/types"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "4da3c4a7-3977-4780-8e52-4492f8d0f2f3"
    }
})
export const usersAPI = {
    getUser(currentPage: number, pageSize: number) {
        return instance.get<GetUserResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post<PostResponseType>(`follow/${id}`).then(response => {
            return response.data
        })
    },
    unfollow(id: number) {
        return instance.delete<PostResponseType>(`follow/${id}`).then(response => {
            return response.data
        })
    },
    getProfile(userId: number) {
        console.warn('Obsolete method');
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<PostResponseType>(`profile/status`, { status: status })
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<PostResponseType>(`profile`, profile).then(res => res.data)
    }
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me').then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete<PostResponseType>('auth/login').then(res => res.data)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCpatchaUrlType>('security/get-captcha-url')
    }
}
type PostResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<String>
    data: {}
}
type GetUserResponseType = {
    items: Array<UserType>
    totalCount: number
    error: number
}
type SavePhotoResponseType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodesEnum
    messages: Array<String>
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<String>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<String>
}
type GetCpatchaUrlType = {
    url: string
}

import axios from "axios"
import { UserType } from "../types/types"

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "4da3c4a7-3977-4780-8e52-4492f8d0f2f3"
    }
})
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<String>
    resultCode: RC
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptchaEnum {
    CaptchaIsRequired = 10
}



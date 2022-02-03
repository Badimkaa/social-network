import { instance } from "./api"
type GetCpatchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCpatchaUrlResponseType>('security/get-captcha-url').then(res => res.data)
    }
};

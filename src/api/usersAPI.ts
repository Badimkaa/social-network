import { APIResponseType, GetItemsType, instance } from "./api";

export const usersAPI = {
    getUser(currentPage: number, pageSize: number, term: string = '') {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`).then(response => {
            return response.data
        });
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(res => res.data)
    }
};

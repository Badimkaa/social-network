import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'
 
const getUsers = (state:AppStateType) => {
    return state.usersPage.users
}
export const getAllUsers = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const totalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
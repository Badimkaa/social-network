import { Dispatch } from "redux"
import { APIResponseType, ResultCodesEnum } from "../api/api"
import { usersAPI } from "../api/usersAPI"
import { UserType } from "../types/types"
import { updateObjectInArray } from '../utils/object-helpers'
import { AppStateType, BaseThunkType, InferActionTypes } from "./redux-store"

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id
    filter: {
        term:''
    }
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InferActionTypes<typeof actions>
const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u
                // })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SET_USERS': {
            return { ...state, users: [...action.users] }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalCount: action.totalCount }
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'SET_FILTER': {
            return {
                ...state, filter: action.payload
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default: return state
    }
}
export const actions = {
    followSuccess: (userId: number) => {
        return { type: 'FOLLOW', userId: userId } as const
    },
    unfollowSuccess: (userId: number) => {
        return { type: 'UNFOLLOW', userId: userId } as const
    },
    setUsers: (users: Array<UserType>) => {
        return { type: 'SET_USERS', users: users } as const
    },
    setCurrentPage: (currentPage: number) => {
        return { type: 'SET_CURRENT_PAGE', currentPage: currentPage } as const
    },
    setFilter: (term: string) => ({ type: 'SET_FILTER', payload:{term} } as const),
    setTotalUsersCount: (totalCount: number) => {
        return { type: 'SET_TOTAL_USERS_COUNT', totalCount: totalCount } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_IS_FETCHING',
            isFetching: isFetching
        } as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const
    }
}
type ThunkType = BaseThunkType<ActionTypes>
export const getUsers = (page: number, pageSize: number, term: string) => {
    return async (dispatch: Dispatch<ActionTypes>, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(term))
        let data = await usersAPI.getUser(page, pageSize, term)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)
    }
}

export default usersReducer
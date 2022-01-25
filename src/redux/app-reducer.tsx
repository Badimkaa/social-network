import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./auth-reduceer"
import { AppStateType } from "./redux-store"
const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
}
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
type ActionTypes = InitializedSuccessActionType
// type InitialStateType = typeof initialState
const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default: return state
    }
}

const initializedSuccess = (): InitializedSuccessActionType => {
    return { type: INITIALIZED_SUCCESS }
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer

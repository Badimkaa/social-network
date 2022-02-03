import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType, InferActionTypes } from "./redux-store"
const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}
type InitialStateType = typeof initialState
const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default: return state
    }
}
type ActionsType = InferActionTypes<typeof actions>
export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS })
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer

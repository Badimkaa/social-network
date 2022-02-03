import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

//@ts-ignore
window.store = store

export default store

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>> 

export type InferActionTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never
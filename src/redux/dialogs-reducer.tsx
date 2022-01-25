import { DialogsType, MessagesType } from "../types/types"

const ADD_MESSAGE = 'dialogs/ADD-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Vadim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530970.png' },
        { id: 2, name: 'Egor', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530957.png' },
        { id: 3, name: 'Alina', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530937.png' },
        { id: 4, name: 'Sasha', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530910.png' },
        { id: 5, name: 'Maksim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530930.png' },
    ] as Array<DialogsType>, 
    messages: [
        { id: 1, personId: 1, message: 'Привет, как ты?' },
        { id: 2, personId: 2, message: 'Да нормально, а ты?' },
        { id: 3, personId: 1, message: 'Ай, достало всё' },
        { id: 4, personId: 1, message: 'Ай, достало всё' },
        { id: 5, personId: 1, message: 'Ай, достало всё' },
        { id: 6, personId: 2, message: 'Что случилось?' }
    ] as Array<MessagesType>,
}
type InitialStateType = typeof initialState
type ActionTypes= AddMessageActionCreatorActionType
const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 7,
                personId: 2,
                message: action.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default: return state
    }
}
type AddMessageActionCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}
export const addMessageActionCreator = (newMessageText: string) : AddMessageActionCreatorActionType => {
    return { type: ADD_MESSAGE, newMessageText }
}


export default dialogsReducer
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import sidebarReducer from "./sidebar-reducer"


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Привет, я только начал изучать реакт и это мой первый проект', likesCount: 5 },
                { id: 2, message: 'Не судите строго', likesCount: 4 }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Vadim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530970.png' },
                { id: 2, name: 'Egor', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530957.png' },
                { id: 3, name: 'Alina', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530937.png' },
                { id: 4, name: 'Sasha', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530910.png' },
                { id: 5, name: 'Maksim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530930.png' },
            ],
            messages: [
                { id: 1, personId: 1, message: 'Привет, как ты?' },
                { id: 2, personId: 2, message: 'Да нормально, а ты?' },
                { id: 3, personId: 1, message: 'Ай, достало всё' },
                { id: 4, personId: 1, message: 'Ай, достало всё' },
                { id: 5, personId: 1, message: 'Ай, достало всё' },
                { id: 6, personId: 2, message: 'Что случилось?' }
            ],
            newMessageText: ''
        },
        sidebar: {
            friends: [
                { id: 1, name: 'Vadim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530970.png' },
                { id: 3, name: 'Alina', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530937.png' },
                { id: 4, name: 'Sasha', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530910.png' },
            ]
        }
    },
    _callSubscriber() {
        console.log('no subscribers');
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    },
}



export default store
type FriendsType = {
    id: number
    name: string
    ava:string
}
let initialState = {
    friends: [
        { id: 1, name: 'Vadim', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530970.png' },
        { id: 3, name: 'Alina', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530937.png' },
        { id: 4, name: 'Sasha', ava: 'https://cdn-icons-png.flaticon.com/512/4530/4530910.png' },
    ] as Array<FriendsType>
}
type InitialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any) => {

    return state
}

export default sidebarReducer
import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer'
let state = {
    posts: [
        { id: 1, message: 'Привет, я только начал изучать реакт и это мой первый проект', likesCount: 5 },
        { id: 2, message: 'Не судите строго', likesCount: 4 }
    ],
}
it('new post should be added', () => {
    let action = addPostActionCreator('test')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it('after deleting length of messages should e decrement', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect (newState.posts.length).toBe(1)
})

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    let action = deletePost(1000)
    let newState = profileReducer(state, action)
    expect (newState.posts.length).toBe(2)
})
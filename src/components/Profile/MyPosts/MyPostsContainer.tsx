import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store'
import { PostsType } from '../../../types/types'
import MyPosts from './MyPosts'
type MapStatePropsType = {
  posts: Array<PostsType>
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts
  }
}

type MapDispatchPropsType = {
  addPost: (text: string, postId: number) => void
  deletePost: (postId: number) => void
}
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    addPost: (newPostText, postId) => {
      dispatch(actions.addPostActionCreator(newPostText, postId))
      dispatch(reset('profileAddPostForm'))
    },
    deletePost: (postId) => {
      dispatch(actions.deletePost(postId))
    }
  }
}
let MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType,{}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
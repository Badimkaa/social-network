import React, { FC } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { PostsType } from '../../../types/types'
import { maxLengthCreator, required } from '../../../utils/validators'
import styles from './MyPosts.module.css'
import Post from './Post/Post'

let maxLength1000 = maxLengthCreator(1000)
let postId = 3;

type AddPostFormPropsType = {}
type AddPostFormValuesType = {
  newPostText: string
}
type PropsType = {
  posts: Array<PostsType>
  deletePost: (postId: number) => void
  addPost: (text: string, postId: number) => void
}

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, AddPostFormPropsType> & AddPostFormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field className={styles.field} component='textarea' name='newPostText' placeholder='Enter your text' validate={[required, maxLength1000]} />
      </div>
      <div>
        <button className={styles.addPost}>Add post</button>
      </div>
    </form>
  )
}
const AddPostReduxForm = reduxForm<AddPostFormValuesType, AddPostFormPropsType>({ form: 'profileAddPostForm' })(AddPostForm)

const MyPosts: FC<PropsType> = (props) => {
  let postsElements = props.posts.map(el => {
    // в строчке ниже дожно быть key={el}
    return <Post message={el.message} likesCount={el.likesCount} id={el.id} deletePost={props.deletePost} />
  }).reverse()

  let addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText, postId)
    postId++
  }
  return (
    <div className={styles.postsBlock}>
      <p className={styles.myPosts}>My posts</p>
      <AddPostReduxForm onSubmit={addNewPost} />
      <div className={styles.allPosts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts
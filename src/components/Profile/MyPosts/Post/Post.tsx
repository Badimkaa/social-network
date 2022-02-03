import styles from './Post.module.css'
import ava from './avatar.png'
import { FC } from 'react'
type PropsType = {
  deletePost: (postId: number) => void
  id: number
  message: string
  likesCount: number
}
const Post: FC<PropsType> = (props) => {
  let deletePost = () => {
    props.deletePost(props.id)
  }
  return (
    <div className={styles.postBlock}>
      <div className={styles.postMessage}>
        <img src={ava} alt='avatar' />
        <div className={styles.postText}>
          {props.message}
        </div>
      </div>
      <div className={styles.likeDelete}>
        <div >
          {props.likesCount} likes
        </div>
        <button className={styles.deletePost} onClick={deletePost}>Delete</button>
      </div>
    </div>

  )
}

export default Post
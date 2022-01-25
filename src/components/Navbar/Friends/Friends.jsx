import FriendItem from "./FriendItem/FriendItem"
import styles from './Friends.module.css'
const Friends = (props) => {
    let friendsElements = props.friends.map(el => {
        return <FriendItem ava={el.ava} name={el.name} key={el.id} id={el.id} />
    })
    return (
        <div className={styles.friends}>
            <p className={styles.title}>Friends</p>
            <div className={styles.friendsItems}>
                {friendsElements}
            </div>
        </div>
    )
}
export default Friends
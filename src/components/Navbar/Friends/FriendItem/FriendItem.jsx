import { NavLink } from 'react-router-dom'
import styles from './../Friends.module.css'
const FriendItem = (props) => {
    return (
        <div className={styles.friend}>
            <NavLink to={`/dialogs/${props.id}`}>
                <img src={props.ava} alt={props.name} />
                <p className={styles.friendName}>{props.name}</p>
            </NavLink>
        </div>
    )
}
export default FriendItem
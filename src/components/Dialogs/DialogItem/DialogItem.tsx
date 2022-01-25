import styles from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

type PropsType = {
    id: number
    ava: string
    name: string
}
const DialogItem: FC<PropsType> = (props) => {
    return (
        <NavLink className={styles.dialog} to={`/dialogs/${props.id}`} activeClassName={styles.active} >
            <img src={props.ava} alt={props.name} />
            <p>{props.name}</p>
        </NavLink>
    )
}
export default DialogItem
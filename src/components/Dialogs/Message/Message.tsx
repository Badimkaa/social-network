import React, { FC } from 'react'
import { DialogsType } from '../../../types/types'
import styles from './../Dialogs.module.css'
type PropsType = {
    personId: number
    message: string
    dialogs: Array<DialogsType>
}
const Message: FC<PropsType> = (props) => {
    // в пропсах message, personId, dialogs
    let moveStyle = ''
    if (props.personId !== 1) {
        moveStyle = '80%'
    }
    return (
        <div>
            {/* <img src={res.ava} alt={res.name} />
            <p>{res.name}</p> */}
            <div className={styles.message} style={{ left: moveStyle }}>
                <span className={styles.textMessage} >{props.message}</span>
            </div>
        </div>
    )
}

export default Message
import React, { ChangeEvent, FC, useEffect, useState } from "react"
import styles from './ProfileInfo.module.css'

type PropsType = {
status:string
isOwner:boolean
updateStatus: (status:string) => void
}
const ProfileStatusWithHooks:FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])  
    const activateEditMode = () => {
        console.log(props.isOwner);
        if (props.isOwner) {
            setEditMode(true)
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {editMode
                ? <input className={styles.status} onChange={onStatusChanged} style={{ height: 18+'px' }} onBlur={deactivateEditMode} autoFocus={true} value={status} />
                : <span className={styles.status} style={{ cursor: 'pointer' }} onClick={activateEditMode}>{props.status || 'No status'}</span>
            }
        </div>
    )
}
export default ProfileStatusWithHooks
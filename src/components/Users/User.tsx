import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/user.png'
import { UserType } from '../../types/types'
import styles from './Users.module.css'
type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User: FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div >
            <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                    alt={user.name} className={styles.userPhoto} />
            </NavLink>
            {
                user.followed ? <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => unfollow(user.id)}>
                    Unfollow
                </button> : <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => follow(user.id)}>
                    Follow
                </button>
            }
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>
        </div >
    )
}
export default User
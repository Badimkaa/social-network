import React, { FC } from 'react'
import { FilterType } from '../../redux/users-reducer'
import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import styles from './Users.module.css'
import { UsersSearchForm } from './usersSearchForm'
type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    totalCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const Users: FC<PropsType> = ({ currentPage, onPageChanged, totalCount, pageSize, ...props }) => {
    return (
        <div className={styles.usersBlock}>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalCount} pageSize={pageSize} />
            {props.users.map(u => {
                return <User key={u.id} user={u} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />
            })}
        </div >
    )
}
export default Users
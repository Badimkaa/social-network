import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentPage, follow, unfollow, toggleFollowingProgress, getUsers } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getAllUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, totalUsersCount } from "../../redux/users-selectors";



const UsersContainer = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, [])
    // componentDidMount() {
    //     props.getUsers(props.currentPage, props.pageSize)
    //     // props.toggleIsFetching(true)
    //     // usersAPI.getUser(props.currentPage, props.pageSize).then(data => {
    //     //     props.toggleIsFetching(false)
    //     //     props.setUsers(data.items)
    //     //     props.setTotalUsersCount(data.totalCount)
    //     // })
    // }
    let onPageChanged = (pageNumber) => {
        props.getUsers(pageNumber, props.pageSize)
        // props.setCurrentPage(pageNumber)
        // props.toggleIsFetching(true)
        // usersAPI.getUser(pageNumber, props.pageSize).then(data => {
        //     props.toggleIsFetching(false)
        //     props.setUsers(data.items)
        // })
    }
    return (
        <>
            {props.isFetching ? <Preloader /> : null}
            <Users totalCount={props.totalCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={onPageChanged}
                users={props.users}
                follow={props.follow}
                unfollow={props.unfollow}
                isFetching={props.isFetching}
                toggleIsFetching={props.toggleIsFetching}
                toggleFollowingProgress={props.toggleFollowingProgress}
                followingInProgress={props.followingInProgress}
            />
        </>
    )
}
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalCount: state.usersPage.totalCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
let mapStateToProps = (state) => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalCount: totalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

// функцию mapDispatchToProps можно заменить объектом, в который передаем сразу action creatorы,
//  где наменование ключа соответствует наименованию action creator, т.е. {follow: follow},
// где значение follow - action creator
export default compose(withAuthRedirect, connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers }))(UsersContainer)
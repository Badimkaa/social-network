import React, { FC, MouseEventHandler, useState } from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';
type PropsType = {
    isAuth: boolean
    photos: any
    login: string | null
    logout: () => void
}
const Header: FC<PropsType> = (props) => {

    let [showLogout, setShowLogout] = useState(false)
    let showPopUp = () => {
        showLogout ? setShowLogout(false) : setShowLogout(true)
    }
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <p className={styles.logo}><NavLink to='/profile'>social network</NavLink></p>
                <div className={styles.loginBlock}>
                    {props.isAuth ?
                        <div >
                            <div tabIndex={0} onClick={showPopUp} className={styles.smallPhoto}>
                                <div>
                                    <img src={props.photos} alt="authPhoto" />
                                </div>
                                {props.login}
                            </div>
                            {showLogout ? <div className={styles.logOutPopUp}> <button className={styles.logOutButton} onClick={props.logout}>Log out</button></div> : <></>}

                        </div> :
                        <NavLink className={styles.login} to='/login'>Login</NavLink>}
                </div>
            </div>
        </header>
    )
}
export default Header;
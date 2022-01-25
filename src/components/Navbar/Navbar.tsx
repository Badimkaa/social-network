import { NavLink } from 'react-router-dom';
import FriendsContainer from './Friends/FriendsContainer';
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/profile'>Profile</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/dialogs'>Messages</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/users'>Users</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/news'> News</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/music'>Music</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink activeClassName={styles.activeLink} to='/settings'>Settings</NavLink>
                </div>
            </nav>
            <FriendsContainer />
        </div>
    )
}

export default Navbar
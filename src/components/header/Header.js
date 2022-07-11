import styles from '../../styles/components/Header.module.scss'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {

    const guestView = () => {
        return (
            <>
                <li><NavLink className={styles['header__navLink']}to='/'><i className="fa-solid fa-house"></i>Home</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/search'><i className="fa-solid fa-magnifying-glass"></i>Search</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/community'><i className="fa-solid fa-comments"></i>Community</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/about'><i className="fa-solid fa-circle-info"></i>About</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/login'><i className="fa-solid fa-right-to-bracket"></i>Login</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/register'><i className="fa-solid fa-registered"></i>Register</NavLink></li>
            </>
        )
    }

    const userView = () => {
        return (
            <>
                <li><NavLink className={styles['header__navLink']}to='/'><i className="fa-solid fa-house"></i>Home</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/search'><i className="fa-solid fa-magnifying-glass"></i>Search</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/profile'><i className="fa-solid fa-user"></i>My Profile</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/community'><i className="fa-solid fa-comments"></i>Community</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/about'><i className="fa-solid fa-circle-info"></i>About</NavLink></li>
                <li><NavLink className={styles['header__navLink']}to='/'><i className="fa-solid fa-arrow-up-right-from-square"></i>Logout</NavLink></li>
            </>
        )
    }

    return (
        <header>
            <div><img src={logo} alt=""/>GameBlob - For All Your Blobbing Needs</div>
            <nav>
                <ul className={styles['nav__ul']}>
                    {props.hasToken ? userView(): guestView()}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
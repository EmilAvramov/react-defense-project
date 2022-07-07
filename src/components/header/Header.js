import styles from '../styles/components/Header.module.scss'
import logo from '../assets/logo.png'

const Header = (props) => {
    const guestView = () => {
        return (
            <>
                <li><a href="http://"><i className="fa-solid fa-house"></i>Home</a></li>
                <li><a href="http://"><i className="fa-solid fa-comments"></i>Community</a></li>
                <li><a href="http://"><i className="fa-solid fa-circle-info"></i>About</a></li>
                <li><a href="http://"><i className="fa-solid fa-right-to-bracket"></i>Login</a></li>
                <li><a href="http://"><i className="fa-solid fa-registered"></i>Register</a></li>
            </>
        )
    }

    const userView = () => {
        return (
            <>
                <li><a href="http://"><i className="fa-solid fa-house"></i>Home</a></li>
                <li><a href="http://"><i className="fa-solid fa-user"></i>My Profile</a></li>
                <li><a href="http://"><i className="fa-solid fa-comments"></i>Community</a></li>
                <li><a href="http://"><i className="fa-solid fa-circle-info"></i>About</a></li>
                <li><a href="http://"><i className="fa-solid fa-arrow-up-right-from-square"></i>Logout</a></li>
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
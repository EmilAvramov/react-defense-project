import styles from '../styles/components/Header.module.scss'
import logo from '../assets/logo.png'

const Header = (props) => {
    const guestView = () => {
        return (
            <>
                <li><a href="http://">Home</a></li>
                <li><a href="http://">Community</a></li>
                <li><a href="http://">About</a></li>
                <li><a href="http://">Login</a></li>
                <li><a href="http://">Register</a></li>
            </>
        )
    }

    const userView = () => {
        return (
            <>
                <li><a href="http://">Home</a></li>
                <li><a href="http://">My Profile</a></li>
                <li><a href="http://">Community</a></li>
                <li><a href="http://">About</a></li>
                <li><a href="http://">Logout</a></li>
            </>
        )
    }

    return (
        <header>
            <div><img src={logo} alt="" />GameBlob - For All Your Blobbing Needs</div>
            <nav>
                <ul className={styles['nav__ul']}>
                    {props.hasToken ? userView(): guestView()}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
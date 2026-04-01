import styles from './Header.module.css'
import alarm from '../../public/alarm.png'
function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>

            <div className={styles.right}>
                <div className={styles.alarm}>
                    <img src={alarm} alt="Alarm" />
                </div>

                <div className={styles.username}>Username</div>
                <div className={styles.logout}>Logout</div>
            </div>

        </header>
    )
}

export default Header;
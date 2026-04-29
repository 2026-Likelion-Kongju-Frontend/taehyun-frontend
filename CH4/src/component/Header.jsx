import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import alarm from '../assets/alarm.png'

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>LOGO</Link>

            <div className={styles.right}>
                <button className={styles.alarmBtn}>
                    <img src={alarm} alt="알림" className={styles.alarmIcon} />
                </button>

                <span className={styles.username}>전태현</span>
                <button className={styles.logout}>로그아웃</button>
            </div>
        </header>
    )
}

export default Header

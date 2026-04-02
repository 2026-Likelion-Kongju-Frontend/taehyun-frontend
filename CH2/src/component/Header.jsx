import styles from './Header.module.css'
import alarm from '../assets/alarm.png'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>

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

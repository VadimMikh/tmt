import { NavLink } from 'react-router-dom'
import styles from './MainLink.module.css'

const MainLink = ({ link, text, children, disabled }) => (
    <NavLink className={`${styles.cardlink} ${disabled && styles.cardlinkDisabled}`} to={link}>
        <div className={styles.card}>
            <div className={styles.cardtext}>{text}</div>
            <div className={styles.cardinner}>{children}</div>
        </div>
    </NavLink>
)


export default MainLink

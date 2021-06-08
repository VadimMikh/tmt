import { NavLink } from 'react-router-dom'
import styles from './MainLink.module.css'

type MainLinkProps = {
    link: string,
    text: string,
    children: JSX.Element[] | JSX.Element,
    disabled: boolean
}

const MainLink = ({ link, text, children, disabled }: MainLinkProps) => (
    <NavLink className={`${styles.cardlink} ${disabled && styles.cardlinkDisabled}`} to={link}>
        <div className={styles.card}>
            <div className={styles.cardtext}>{text}</div>
            <div className={styles.cardinner}>{children}</div>
        </div>
    </NavLink>
)


export default MainLink

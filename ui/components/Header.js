import styles from '../styles/Header.module.css';

export default function Header({title}) {
    return (
        <nav className="navbar sticky-top navbar-dark bg-primary">
            <a className="navbar-brand" href="#"><span className={styles.navbarTxt}>{title}</span></a>
        </nav>
    );
}
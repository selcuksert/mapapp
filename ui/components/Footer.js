import styles from '../styles/Footer.module.css';

export default function Footer({content}) {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <span className="text-muted">{content}</span>
            </div>
        </footer>
    );
}
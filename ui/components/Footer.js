import styles from '../styles/Footer.module.css';
import 'leaflet/dist/leaflet.css';

export default function Footer({content}) {
    return (
        <footer className={styles.footer}>
            <div className="container-fluid">
                <span className="text-muted">{content}</span>
            </div>
        </footer>
    );
}
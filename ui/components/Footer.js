import styles from '../styles/Footer.module.css';
import 'leaflet/dist/leaflet.css';
import moment from "moment";
import {version} from "../version"

export default function Footer({copyrightText}) {
    const copyright = String.fromCodePoint(0x00A9);

    return (
        <footer className={styles.footer}>
            <div className="container-fluid">
                <div className="float-start">
                    <span className="text-secondary fw-light">{`v${version}`}</span>
                </div>
                <div className="float-end">
                    <span className="text-muted">{`Copyright ${copyright} `}</span>
                    <span className="text-primary">{moment().year()}</span>
                    <span className="text-muted">{` `}</span>
                    <span className="text-muted">{`${copyrightText}`}</span>
                </div>
            </div>
        </footer>
    );
}
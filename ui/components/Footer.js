import styles from '../styles/Footer.module.css';
import moment from "moment";
import {version} from "../version"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

export default function Footer({copyrightText}) {
    const copyright = String.fromCodePoint(0x00A9);

    return (
        <footer className={styles.footer}>
            <div className="container-fluid">
                <div className="float-start">
                    <span className="text-secondary fw-light me-2">{`v${version}`}
                    </span>
                    <a href="https://github.com/selcuksert/mapapp" target="_blank">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
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
import styles from '../styles/Header.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthenticatedUpdateContext, KeycloakContext, KeycloakUpdateContext} from "../pages";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge, faUser} from "@fortawesome/free-regular-svg-icons";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export default function Header({title}) {
    const keycloak = useContext(KeycloakContext);
    const setKeycloak = useContext(KeycloakUpdateContext);
    const setAuthenticated = useContext(AuthenticatedUpdateContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!!keycloak) {
            keycloak.loadUserInfo().then(info => {
                setUserInfo(info);
            });
        }
    }, []);

    const logout = () => {
        setAuthenticated(false);
        setKeycloak(null);
        keycloak.logout();
    }

    return (
        <nav className="navbar sticky-top navbar-dark bg-primary navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className={styles.navbarTxt}>{title}</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-flex me-2">
                    <div className="me-5">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        {!!userInfo ? userInfo['preferred_username'] : 'user'}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#"><FontAwesomeIcon
                                                icon={faIdBadge}
                                                className="me-2"/>{!!userInfo ? userInfo.name : 'name'}
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#"
                                               onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}
                                                                                 className="me-2"/>Logout
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#c2d3c0"}} className="mt-1"/>
                    </div>
                </div>
            </div>
        </nav>
    )
        ;
}
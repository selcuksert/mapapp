import styles from '../styles/Header.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthenticatedUpdateContext, KeycloakContext, KeycloakUpdateContext} from "../pages";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-regular-svg-icons";
import {faArrowRightFromBracket, faCircleUser} from "@fortawesome/free-solid-svg-icons";

export default function Header({title}) {
    const keycloak = useContext(KeycloakContext);
    const setKeycloak = useContext(KeycloakUpdateContext);
    const setAuthenticated = useContext(AuthenticatedUpdateContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (keycloak) {
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
                <div className="d-flex me-5">
                    <div className="mt-1">
                        <FontAwesomeIcon icon={faCircleUser} size="xl" style={{color: "#c2d3c0"}} className="mt-1"/>
                    </div>
                    <div className="me-5">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {userInfo ? userInfo['preferred_username'] : 'user'}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#"><FontAwesomeIcon
                                            icon={faIdBadge}
                                            className="me-2"/>{userInfo ? userInfo.name : 'name'}
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
            </div>
        </nav>
    )
        ;
}
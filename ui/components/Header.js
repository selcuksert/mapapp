import styles from '../styles/Header.module.css';
import {useContext} from "react";
import {AuthenticatedContext, AuthenticatedUpdateContext, KeycloakContext, KeycloakUpdateContext} from "../pages";

export default function Header({title}) {
    const keycloak = useContext(KeycloakContext);
    const setKeycloak = useContext(KeycloakUpdateContext);
    const authenticated = useContext(AuthenticatedContext);
    const setAuthenticated = useContext(AuthenticatedUpdateContext);

    const logout = () => {
        setAuthenticated(false);
        setKeycloak(null);
        keycloak.logout();
    }

    return (
        <nav className="navbar sticky-top navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className={styles.navbarTxt}>{title}</span></a>
                <form className="d-flex" role="search">
                    <button className="btn btn-outline-light" type="submit" onClick={logout}>Logout</button>
                </form>
            </div>
        </nav>
    );
}
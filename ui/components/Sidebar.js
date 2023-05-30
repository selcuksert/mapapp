import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import 'sidebar-v2/js/leaflet-sidebar';
import styles from '../styles/Sidebar.module.css';
import {useContext, useEffect} from 'react';
import {MapContext} from '../pages/index';
import LifeExpect from "./stats/LifeExpect";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPersonPregnant, faBars} from '@fortawesome/free-solid-svg-icons';
import Home from "./stats/Home";

export default function Sidebar() {

    const {map,} = useContext(MapContext);

    useEffect(() => {
        L.control.sidebar('sidebar').addTo(map);
    }, []);

    return (
        <>
            <div id="sidebar" className={`sidebar collapsed ${styles.centered}`}>
                <div className="sidebar-tabs">
                    <ul role="tablist">
                        <li><a href={"#home"} role="tab">
                            <FontAwesomeIcon icon={faBars}/>
                        </a></li>
                        <li><a href={"#profile"} role="tab">
                            <FontAwesomeIcon icon={faPersonPregnant}/>
                        </a>
                        </li>
                        <li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i
                            className="fa fa-github"></i></a></li>
                    </ul>

                    <ul role="tablist">
                        <li><a href={"#settings"} role="tab"><i className="fa fa-gear"></i></a></li>
                    </ul>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-pane" id="home">
                        <Home/>
                    </div>

                    <div className="sidebar-pane" id="profile">
                        <LifeExpect/>
                    </div>

                    <div className="sidebar-pane" id="settings">
                        <h1 className="sidebar-header">Settings<span className="sidebar-close"><i
                            className="fa fa-caret-left"></i></span></h1>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}
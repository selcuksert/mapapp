import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import 'sidebar-v2/js/leaflet-sidebar';
import styles from '../styles/Sidebar.module.css';
import {createContext, useContext, useEffect, useState} from 'react';
import {MapStateContext} from '../pages/index';
import LifeExpect from "./stats/LifeExpect";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faGear, faPeopleGroup, faPersonPregnant} from '@fortawesome/free-solid-svg-icons';
import Home from "./stats/Home";
import Settings from "./stats/Settings";
import Population from "./stats/Population";
import MedianAge from "./stats/MedianAge";

export const LocationsContext = createContext({"loading": true, data: []});

export default function Sidebar() {

    const map = useContext(MapStateContext);
    const [locations, setLocations] = useState({"loading": true, data: []});

    const getLocations = () => {
        let url = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;
        fetch(`${url}?sort=name`)
            .then(response => response.json())
            .then(json => {
                setLocations({
                    "loading": false,
                    "data": json
                });
            })
            .catch(e => console.error("error", e));
    };

    useEffect(() => {
        L.control.sidebar('sidebar').addTo(map);
        getLocations();
    }, []);

    return (
        <>
            <LocationsContext.Provider value={locations}>
                <div id="sidebar" className={`sidebar collapsed ${styles.centered}`}>
                    <div className="sidebar-tabs">
                        <ul role="tablist">
                            <li>
                                <a href={"#home"} role="tab">
                                    <FontAwesomeIcon icon={faBars}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#expectlife"} role="tab">
                                    <FontAwesomeIcon icon={faPersonPregnant}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#population"} role="tab">
                                    <FontAwesomeIcon icon={faPeopleGroup}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#medage"} role="tab">
                                    <FontAwesomeIcon icon={faPeopleGroup}/>
                                </a>
                            </li>
                        </ul>

                        <ul role="tablist">
                            <li><a href={"#settings"} role="tab">
                                <FontAwesomeIcon icon={faGear}/>
                            </a></li>
                        </ul>
                    </div>
                    <div className="sidebar-content">
                        <div className="sidebar-pane" id="home">
                            <Home/>
                        </div>

                        <div className="sidebar-pane" id="expectlife">
                            <LifeExpect/>
                        </div>

                        <div className="sidebar-pane" id="population">
                            <Population/>
                        </div>

                        <div className="sidebar-pane" id="medage">
                            <MedianAge/>
                        </div>

                        <div className="sidebar-pane" id="settings">
                            <Settings/>
                        </div>
                    </div>
                </div>
            </LocationsContext.Provider>
        </>
    )
        ;
}
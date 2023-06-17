import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import 'sidebar-v2/js/leaflet-sidebar';
import styles from '../styles/Sidebar.module.css';
import {createContext, useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBaby,
    faBars,
    faBirthdayCake,
    faGear,
    faPeopleGroup,
    faPersonWalkingDashedLineArrowRight,
    faRing
} from '@fortawesome/free-solid-svg-icons';
import Home from "./sidebar/Home";
import Settings from "./sidebar/Settings";
import Stats from "./sidebar/Stats";
import {KeycloakContext, MapStateContext} from "../pages";

export const LocationsContext = createContext({"loading": true, data: []});

export default function Sidebar() {

    const map = useContext(MapStateContext);
    const keycloak = useContext(KeycloakContext);
    const [locations, setLocations] = useState({"loading": true, data: []});

    const getLocations = () => {
        let url = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        })
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

    const formatNumber = (value) => {
        return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

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
                                    <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#population"} role="tab">
                                    <FontAwesomeIcon icon={faPeopleGroup}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#medage"} role="tab">
                                    <FontAwesomeIcon icon={faBirthdayCake}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#married"} role="tab">
                                    <FontAwesomeIcon icon={faRing}/>
                                </a>
                            </li>
                            <li>
                                <a href={"#fertility"} role="tab">
                                    <FontAwesomeIcon icon={faBaby}/>
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
                            <Stats maxValue={100} maxRadius={250_000} header={`Life Expectancy at Birth`}
                                   baseUrl={process.env.NEXT_PUBLIC_LIFEXP_API_URL} fillColor={`#f03`}
                                   valueFormatter={(value) => value} extraQueries={`sexes=3`}
                                   fractionDigits={0}
                                   indicatorDisplayName={`Life Expectancy (yrs)`}/>
                        </div>
                        <div className="sidebar-pane" id="population">
                            <Stats maxValue={250_000_000} maxRadius={250_000} header={`Population`}
                                   baseUrl={process.env.NEXT_PUBLIC_POPULATION_API_URL} fillColor={`#8DEA23`}
                                   valueFormatter={formatNumber} extraQueries={`sexes=3`}
                                   fractionDigits={0}
                                   indicatorDisplayName={`Population`}/>
                        </div>
                        <div className="sidebar-pane" id="medage">
                            <Stats maxValue={100} maxRadius={250_000} header={`Median Age`}
                                   baseUrl={process.env.NEXT_PUBLIC_MEDAGE_API_URL} fillColor={`#707BE7`}
                                   fractionDigits={1}
                                   valueFormatter={formatNumber}/>
                        </div>
                        <div className="sidebar-pane" id="married">
                            <Stats maxValue={100} maxRadius={250_000} header={`Currently married (Percent)`}
                                   baseUrl={process.env.NEXT_PUBLIC_MARRIED_API_URL} fillColor={`#40ECDC`}
                                   fractionDigits={1} valueFormatter={(value) => value}/>
                        </div>
                        <div className="sidebar-pane" id="fertility">
                            <Stats maxValue={5} maxRadius={250_000} header={`Fertility Rate`}
                                   baseUrl={process.env.NEXT_PUBLIC_FERTILITY_API_URL} fillColor={`#8d9981`}
                                   fractionDigits={1} valueFormatter={(value) => value}/>
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
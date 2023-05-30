import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import styles from '../styles/Map.module.css';
import {useContext, useEffect, useRef} from 'react';
import {MapContext} from '../pages/index';

export default function Map({latitude, longitude}) {

    const locationMap = useRef(null);

    const {map, setMap} = useContext(MapContext);

    useEffect(() => {

        // To avoid container is already created error on refreshes
        let container = L.DomUtil.get(locationMap.current);
        if (container != null) {
            container._leaflet_id = null;
        }

        let map = L.map(locationMap.current, {
            draggable: true,
            dragging: true
        }).setView([latitude, longitude], 5);

        L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: `Map Data &copy; <a href="https://www.google.com/">${new Date().getFullYear()} Google</a>`
        }).addTo(map);

        setMap(map);
    }, []);

    return (
        <div className={`sidebar-map ${styles.mapContainer}`} ref={locationMap}/>
    );
}
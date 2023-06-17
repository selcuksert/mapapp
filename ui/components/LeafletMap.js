import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import styles from '../styles/Map.module.css';
import {useContext, useEffect, useRef} from 'react';
import {MapUpdateContext} from "../pages";

export default function LeafletMap({latitude, longitude}) {

    const locationMap = useRef(null);

    const setMap = useContext(MapUpdateContext);

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

        L.tileLayer('//{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 10,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: `Map Data &copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_MAP_ATTRIBUTION}`
        }).addTo(map);

        setMap(map);
    }, []);

    return (
        <div className={`sidebar-map ${styles.mapContainer}`} ref={locationMap}/>
    );
}
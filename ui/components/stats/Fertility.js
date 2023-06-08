import {MapStateContext} from "../../pages";
import L from "leaflet";
import {useContext, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import {LocationsContext} from "../Sidebar";
import moment from "moment";

export default function Fertility() {
    const map = useContext(MapStateContext);
    const locations = useContext(LocationsContext);
    const [layers, setLayers] = useState([]);
    const [location, setLocation] = useState(0);

    const addCircle = (lat, lon, indicator, value) => {
        let MAX_VALUE = 5;
        let MAX_RADIUS = 250_000;
        let circle = L.circle([lat, lon], {
            color: 'red',
            fillColor: '#8d9981',
            fillOpacity: 0.5,
            radius: (value / MAX_VALUE) * MAX_RADIUS
        })

        let tooltip = L.tooltip([lat, lon], {
            content: `${indicator}: ${value}`,
            permanent: true
        });

        let layerGroup = L.layerGroup([circle, tooltip]).addTo(map);
        setLayers(layers => [...layers, layerGroup]);
        map.flyTo([lat, lon], 5, {
            animate: true,
            duration: 0.8,
            easeLinearity: 0.5
        })
    };

    const clearMap = () => {
        if (layers.length > 0) {
            layers.forEach(layerGroup => layerGroup.clearLayers());
        }
        setLocation(0);
    };

    const locationSelectHandler = (e) => {
        let url = process.env.NEXT_PUBLIC_FERTILITY_API_URL;
        let locationCode = parseInt(e.target.value);
        let year = moment().year();

        setLocation(locationCode);
        if (locationCode === 0) {
            return;
        }

        fetch(`${url}?startYear=${year}&endYear=${year}&format=json&location=${locationCode}&variants=4`)
            .then(response => response.json())
            .then(json => {
                let fertility = json;
                let location = locations.data.filter(loc => {
                    if (loc.id === locationCode) {
                        return loc;
                    }
                });
                let locationObj = location[0];
                addCircle(locationObj.latitude, locationObj.longitude, fertility.indicatorDisplayName,
                    Number(fertility.value).toFixed(1));
            })
            .catch(e => console.error("error", e));
    };

    return (
        <>
            <h1 className="sidebar-header">Fertility Rate<span className="sidebar-close">
                <FontAwesomeIcon icon={faCaretLeft}/></span>
            </h1>
            <div className="container mt-lg-2">
                <div className="row">
                    <select disabled={locations.loading} className="form-select text-bg-dark bg-primary"
                            onChange={locationSelectHandler}
                            value={location}
                            aria-label="Select location">
                        <option value="0">{locations.loading ? `Loading...` : `Select location`}</option>
                        {locations.data.map((location) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row mt-2">
                    <button className="btn btn-secondary" type="button" onClick={clearMap}>Clear</button>
                </div>
            </div>
        </>
    );
}
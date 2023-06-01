import {MapContext} from "../../pages";
import L from "leaflet";
import {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

export default function LifeExpect() {
    const {map,} = useContext(MapContext);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // https://population.un.org/dataportalapi/api/v1/data/indicators/61/locations/792?startYear=2020&endYear=2023&variants=4&pagingInHeader=false&format=json
    const addCircle = () => {
        L.circle([38.9637451171875, 35.24332046508789], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 50000
        }).addTo(map);
    };

    const getLocations = () => {
        const url = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setLocations(json);
                setLoading(false);
                addCircle();

            })
            .catch(e => console.error("error", e));
    };

    useEffect(() => {
        getLocations();
    }, []);

    return (
        <>
            <h1 className="sidebar-header">Life Expectancy at Birth<span className="sidebar-close">
                <FontAwesomeIcon icon={faCaretLeft}/></span>
            </h1>
            <div className="container mt-lg-2">
                <div className="row">
                    <select disabled={loading} className="form-select text-bg-dark bg-primary"
                            aria-label="Default select example">
                        <option defaultValue="0">{loading ? `Loading...` : `Select location`}</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
import {MapContext} from "../../pages";
import L from "leaflet";
import {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

export default function LifeExpect() {
    const {map,} = useContext(MapContext);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // https://population.un.org/dataportalapi/api/v1/data/indicators/61/locations/792?startYear=2023&endYear=2023&variants=4&sexes=3&pagingInHeader=false&format=json
    const addCircle = (lat, lon, value) => {
        L.circle([lat, lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: value * 1000
        }).addTo(map);
        L.tooltip([lat, lon], {
            content: `Expectation: ${value} years`,
            permanent: true
        }).addTo(map);
    };

    const getLocations = () => {
        let url = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;
        setLoading(true);
        fetch(`${url}?sort=name`)
            .then(response => response.json())
            .then(json => {
                setLocations(json);
                setLoading(false);
            })
            .catch(e => console.error("error", e));
    };

    const drawResult = (e) => {
        let url = process.env.NEXT_PUBLIC_LIFEXP_API_URL;
        let locationCode = parseInt(e.target.value);
        if (locationCode === 0) {
            return;
        }
        setLoading(true);
        fetch(`${url}?endYear=2023&format=json&indicator=61&location=${locationCode}&sexes=3&startYear=2023&variants=4`)
            .then(response => response.json())
            .then(json => {
                let lifeExp = json[0];
                let location = locations.filter(loc => {
                    if (loc.id === locationCode) {
                        return loc;
                    }
                });
                let locationObj = location[0];
                addCircle(locationObj.latitude, locationObj.longitude, lifeExp.value);
                setLoading(false);
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
                            onChange={drawResult}
                            aria-label="Default select example">
                        <option value="0">{loading ? `Loading...` : `Select location`}</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
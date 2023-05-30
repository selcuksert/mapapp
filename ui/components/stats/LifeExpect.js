import {MapContext} from "../../pages";
import L from "leaflet";
import {useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

export default function LifeExpect() {
    const {map,} = useContext(MapContext);

    // https://population.un.org/dataportalapi/api/v1/data/indicators/61/locations/792?startYear=2020&endYear=2023&variants=4&pagingInHeader=false&format=json
    const addCircle = () => {
        L.circle([38.9637451171875, 35.24332046508789], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 50000
        }).addTo(map);
    }

    return (
        <>
            <h1 className="sidebar-header">Life Expectancy at Birth<span className="sidebar-close">
                <FontAwesomeIcon icon={faCaretLeft}/></span>
            </h1>
            <div className="container mt-lg-2">
                <div className="row">
                    <button type="button" className="btn btn-primary" onClick={addCircle}>Add Circle
                    </button>
                </div>
            </div>
        </>
    );
}
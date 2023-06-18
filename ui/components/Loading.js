import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
    return (
        <div className="d-flex justify-content-center" style={{height: `100vh`}}>
            <div className="align-self-center">
                <FontAwesomeIcon icon={faRotate} spin size="5x" style={{color: "#0758e4"}}/>
            </div>
        </div>
    );
}
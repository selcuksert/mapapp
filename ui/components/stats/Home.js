import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <>
            <h1 className="sidebar-header">
                Population Statistics
                <span className="sidebar-close">
                        <FontAwesomeIcon icon={faCaretLeft}/>
                    </span>
            </h1>

            <div className="mt-2">
                <p>This application provides population statistics based on <a
                    href="https://www.un.org/development/desa/pd/">UN Population Division</a> data.</p>

                <p>It consumes <a href="https://population.un.org/dataportalapi/index.html">API endpoints</a> exposed by
                    UNPD, and displays graphics on map based on processed data.</p>
            </div>
        </>
    );
}
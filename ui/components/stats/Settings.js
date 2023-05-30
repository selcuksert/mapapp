import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

export default function Settings() {
    return (
        <>
            <h1 className="sidebar-header">Settings<span className="sidebar-close">
                <FontAwesomeIcon icon={faCaretLeft}/></span>
            </h1>
        </>
    );
}
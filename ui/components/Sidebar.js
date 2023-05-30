import 'leaflet/dist/leaflet.css';
import 'sidebar-v2/css/leaflet-sidebar.min.css'
import L from 'leaflet'
import 'sidebar-v2/js/leaflet-sidebar';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../styles/Sidebar.module.css';
import {useContext, useEffect} from 'react';
import {MapContext} from '../pages/index';

export default function Sidebar() {

    const {map, setMap} = useContext(MapContext);

    useEffect(() => {
        L.control.sidebar('sidebar').addTo(map);
    }, []);

    return (
        <>
            <div id="sidebar" className={`sidebar collapsed ${styles.centered}`}>
                <div className="sidebar-tabs">
                    <ul role="tablist">
                        <li><a href="#home" role="tab"><i className="fa fa-bars"></i></a></li>
                        <li><a href="#profile" role="tab"><i className="fa fa-user"></i></a></li>
                        <li className="disabled"><a href="#messages" role="tab"><i className="fa fa-envelope"></i></a>
                        </li>
                        <li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i
                            className="fa fa-github"></i></a></li>
                    </ul>

                    <ul role="tablist">
                        <li><a href="#settings" role="tab"><i className="fa fa-gear"></i></a></li>
                    </ul>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-pane" id="home">
                        <h1 className="sidebar-header">
                            sidebar-v2
                            <span className="sidebar-close"><i className="fa fa-caret-left"></i></span>
                        </h1>

                        <p>A responsive sidebar for mapping libraries like <a
                            href="http://leafletjs.com/">Leaflet</a> or <a
                            href="http://openlayers.org/">OpenLayers</a>.</p>

                        <p className="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                            diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                            takimata
                            sanctus est Lorem ipsum dolor sit amet.</p>

                        <p className="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                            diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                            takimata
                            sanctus est Lorem ipsum dolor sit amet.</p>

                        <p className="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                            diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                            takimata
                            sanctus est Lorem ipsum dolor sit amet.</p>

                        <p className="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                            diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                            takimata
                            sanctus est Lorem ipsum dolor sit amet.</p>
                    </div>

                    <div className="sidebar-pane" id="profile">
                        <h1 className="sidebar-header">Profile<span className="sidebar-close"><i
                            className="fa fa-caret-left"></i></span></h1>
                    </div>

                    <div className="sidebar-pane" id="messages">
                        <h1 className="sidebar-header">Messages<span className="sidebar-close"><i
                            className="fa fa-caret-left"></i></span></h1>
                    </div>

                    <div className="sidebar-pane" id="settings">
                        <h1 className="sidebar-header">Settings<span className="sidebar-close"><i
                            className="fa fa-caret-left"></i></span></h1>
                    </div>
                </div>
            </div>
        </>
    );
}
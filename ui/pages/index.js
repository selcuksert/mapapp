import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import {createContext, useEffect, useState} from "react";
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import {config} from '@fortawesome/fontawesome-svg-core';
import Keycloak from "keycloak-js";
import Loading from "../components/Loading";

config.autoAddCss = false; /* eslint-disable import/first */

// Disable SSR as LeafletJS requires client side window object
const MapComponent = dynamic(() => import("../components/LeafletMap"), {ssr: false});
const Sidebar = dynamic(() => import("../components/Sidebar"), {ssr: false});

export const MapStateContext = createContext(null);
export const MapUpdateContext = createContext(null);

export const KeycloakContext = createContext(null);
export const KeycloakUpdateContext = createContext(null);
export const AuthenticatedContext = createContext(null);
export const AuthenticatedUpdateContext = createContext(null);


export default function Home() {
    const [map, setMap] = useState(null);
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        let keycloak = new Keycloak(`/keycloak/${process.env.NODE_ENV}.json`);
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            setKeycloak(keycloak);
            setAuthenticated(authenticated);
        }).catch(e => console.error(e));
        require("bootstrap/dist/js/bootstrap.bundle.min");
    }, []);

    return (
        !!keycloak && !!authenticated ?
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>{process.env.NEXT_PUBLIC_PAGE_TITLE}</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <KeycloakContext.Provider value={keycloak}>
                    <KeycloakUpdateContext.Provider value={setKeycloak}>
                        <AuthenticatedContext.Provider value={authenticated}>
                            <AuthenticatedUpdateContext.Provider value={setAuthenticated}>
                                <Header title={process.env.NEXT_PUBLIC_PAGE_TITLE}/>
                                <MapUpdateContext.Provider value={setMap}>
                                    <MapStateContext.Provider value={map}>
                                        <main>
                                            <Sidebar/>
                                            <MapComponent latitude="38.9637451171875" longitude="35.24332046508789"/>
                                        </main>
                                        <Footer copyrightText={process.env.NEXT_PUBLIC_COPYRIGHT}/>
                                    </MapStateContext.Provider>
                                </MapUpdateContext.Provider>
                            </AuthenticatedUpdateContext.Provider>
                        </AuthenticatedContext.Provider>
                    </KeycloakUpdateContext.Provider>
                </KeycloakContext.Provider>
            </div>
            :
            <div>
                <Loading/>
            </div>
    )
}

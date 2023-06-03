import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import {createContext, useEffect, useState} from "react";

// Disable SSR as LeafletJS requires client side window object
const MapComponent = dynamic(() => import("../components/LeafletMap"), {ssr: false});
const Sidebar = dynamic(() => import("../components/Sidebar"), {ssr: false});

export const MapStateContext = createContext(null);
export const MapUpdateContext = createContext(null);

export default function Home() {
    const [map, setMap] = useState(null);
    const copyright = String.fromCodePoint(0x00A9);

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min");
    }, []);

    return (<div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>{process.env.NEXT_PUBLIC_PAGE_TITLE}</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Header title={process.env.NEXT_PUBLIC_PAGE_TITLE}/>

        <MapUpdateContext.Provider value={setMap}>
            <MapStateContext.Provider value={map}>
                <main>
                    <Sidebar/>
                    <MapComponent latitude="38.9637451171875" longitude="35.24332046508789"/>
                </main>
                <Footer content={`Copyright ${copyright} ${process.env.NEXT_PUBLIC_COPYRIGHT} | 2023`}/>
            </MapStateContext.Provider>
        </MapUpdateContext.Provider>

    </div>)
}

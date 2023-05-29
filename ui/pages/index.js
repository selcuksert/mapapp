import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {ssr: false});

export default function Home() {
    return (<div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main>
            <Header title="Map Application"/>
            <Map latitude="38.9637451171875" longitude="35.24332046508789"/>
            <Footer content="Copyright &copy; Selcuk SERT | 2023"/>
        </main>
    </div>)
}

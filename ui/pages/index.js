import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Header title="Map Application"/>
                <Footer content="Copyright &copy; Selcuk SERT | 2023"/>
            </main>
        </div>
    )
}

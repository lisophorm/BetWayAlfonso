import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from "../store";
import '../styles/globals.scss';
import Head from "next/head";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Betway Exercise</title>
                <meta name="description" content="Betway Frontend Exercise"/>
                <meta name="author" content="Alfonso Florio"/>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

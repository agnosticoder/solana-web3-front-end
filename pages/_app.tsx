import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='container'>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}

export default MyApp

import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '~/contexts/authContext';

/**
 * BigscreenApp:
 * 
 * Component entry point for application bootstrap.
 */
function BigscreenApp({ Component, pageProps }) {

    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (pageProps.protected === true && isAuthenticated === false) {
            router.push('/administration');
        }
    }, [isAuthenticated]);

    return (
        <AuthProvider isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
            {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
    );
}

export default BigscreenApp;

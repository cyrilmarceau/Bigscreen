import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
import { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '~/contexts/authContext';

function BigscreenApp({ Component, pageProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();

    useEffect(() => {
        if (pageProps.protected === true && !isAuthenticated === false) {
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

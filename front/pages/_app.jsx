import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '~/contexts/authContext';
import Helper from '~/helpers';

/**
 * BigscreenApp:
 *
 * Component entry point for application bootstrap.
 */
function BigscreenApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const redirect = (isAuth) => {
        if (pageProps.protected === true && isAuth === false) {
            router.push('/administration');
        }
    };

    useEffect(() => {
        const token = Helper.getItem('authToken');

        if (token !== null) {
            setIsAuthenticated(true);
            return redirect(true);
        } else {
            redirect(false);
        }
    });
    return (
        <AuthProvider isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
            {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
    );
}

export default BigscreenApp;

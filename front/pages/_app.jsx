import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
import { AuthContext, useAuth } from '~/contexts/AuthContext';
import { ProtectedRoute } from '~/contexts/ProtectedRoute';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function BigscreenApp({ Component, pageProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();

    useEffect(() => {
        if (pageProps.protected && !isAuthenticated) {
            router.push('/administration');
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated,
            }}>
            <ProtectedRoute>{getLayout(<Component {...pageProps} />)}</ProtectedRoute>
        </AuthContext.Provider>
    );
}

export default BigscreenApp;

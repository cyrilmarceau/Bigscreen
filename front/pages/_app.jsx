import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
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

    return getLayout(<Component {...pageProps} />);
}

export default BigscreenApp;

import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import _ from 'lodash';

function BigscreenApp({ Component, pageProps }) {
    const router = useRouter();

    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(<Component {...pageProps} />);
}

export default BigscreenApp;

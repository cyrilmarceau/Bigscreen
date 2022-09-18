import 'antd/dist/antd.css';
import '../styles/index.scss';
import _ from 'lodash';
import { AuthProvider } from '~/contexts/AuthContext';
import { ProtectedRoute } from '~/contexts/ProtectedRoute';

function BigscreenApp({ Component, pageProps }) {

    const getLayout = Component.getLayout || ((page) => page);

    return(
        <AuthProvider>
            <ProtectedRoute>
                {getLayout(<Component {...pageProps} />)}
            </ProtectedRoute>
        </AuthProvider>
    ) 
    

}

export default BigscreenApp;

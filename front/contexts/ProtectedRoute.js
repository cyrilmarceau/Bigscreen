import { message } from 'antd';
import { includes, startsWith } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();

    const pathForAuthenticated = ['/administration/home', '/administration/questions', '/administration/surveyeds'];

    useEffect(() => {
        const handleRouteChange = () => {
            // console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`);

            if (!auth.isAuthenticated) {
                // router.push('/administration');
            }
        };

        router.events.on('routeChangeStart', () => handleRouteChange());

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return children;
};

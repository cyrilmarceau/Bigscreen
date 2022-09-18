import { message } from "antd";
import { includes, startsWith } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {

    const auth = useAuth();
    const router = useRouter();

    const path_for_authenticated = [
        "/administration/home",
        "/administration/questions",
        "/administration/surveyeds"
    ]

    const exclude_path_for_authenticated = [

    ]

    const isPathIn = (pathList, pathname) => {
        let pathWoWildcard = pathList.filter((p) => !p.includes('*')),
            pathWithWildcard = pathList.filter((p) => p.includes('*')),
            wildcardPathMatch = false

        _.each(pathWithWildcard, (p) => {
            if (startsWith(pathname, p.split('*')[0])) {
                wildcardPathMatch = true
            }
        })

        return includes(pathWoWildcard, pathname) || wildcardPathMatch
    }

    const checkPermission = () => {

        const currPath = window.location.pathname
        
        // console.log('%c‹‹‹‹‹‹‹‹‹ ProtectRoute >> checkPermission ››››››››› ','color: SlateBlue;', url, currPath, JSON.stringify(auth.isAuthenticated, null, 4))

        if (isPathIn(path_for_authenticated, currPath) && !auth.isAuthenticated) {

            // console.log('%c‹‹‹‹‹‹‹‹‹ Route for unauthenticated && not authenticated ›››››››››','color: cyan;')

            message.warning('Veuillez vous connecter.')
            router.push({
                pathname: '/administration',
                query: {
                    next: currPath,
                },
            })
        }

        if (isPathIn(exclude_path_for_authenticated, currPath) && auth.isAuthenticated) {
            
            // console.log('%c‹‹‹‹‹‹‹‹‹ Route for unauthenticated && authenticated ›››››››››', 'color: cyan;')
            
            router.push('/home')
        }
    }

    const handleRouteChange = useCallback(() => checkPermission(), [auth.isAuthenticated])


    useEffect(() => {

        // console.log('%c‹‹‹‹‹‹‹‹‹ ProtectRoute >> registerRouteChange ›››››››››')

        router.events.on('routeChangeComplete', () => console.log("Debug"))

        return () => {

            // console.log('%c‹‹‹‹‹‹‹‹‹ ProtectRoute >> unregisterRouteChange ›››››››››' )

            router.events.off('routeChangeComplete', () => console.log("Debug"))
        }
    }, [auth.isAuthenticated, handleRouteChange, router.events]);

    return children

}
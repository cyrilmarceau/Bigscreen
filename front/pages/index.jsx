import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Home:
 * 
 * Dumb component for redirection.
 */
export default function Home() {
    
    const router = useRouter();

    useEffect(() => {
        router.push('/surveyed');
    }, []);
    
    return;
}

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/administration');
    }, []);
    return <p>DEFAULT LAYOUT CHILDREN</p>;
}

Home.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

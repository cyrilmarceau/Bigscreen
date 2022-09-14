import AdminLayout from '~/components/layout/admin/AdminLayout';

export default function Home() {
    return <p>DEFAULT LAYOUT CHILDREN</p>;
}

Home.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

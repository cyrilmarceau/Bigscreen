import React from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';

const AdminHomePage = () => {
    return <div>index</div>;
};

export default AdminHomePage;

AdminHomePage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

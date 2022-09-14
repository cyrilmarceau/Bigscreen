import React from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';

const index = () => {
    return <div>index</div>;
};

export default index;

index.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

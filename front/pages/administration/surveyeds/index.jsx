import React from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';

const AdminSurveyedsPage = () => {
    return <div>AdminSurveyedsPage</div>;
};

export default index;

AdminSurveyedsPage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

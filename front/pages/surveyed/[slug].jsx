import React from 'react';
import DefaultLayout from '~/components/layout/DefaultLayout';

const ClientSurveyedPage = () => {
    return <div>index</div>;
};

export default ClientSurveyedPage;

ClientSurveyedPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

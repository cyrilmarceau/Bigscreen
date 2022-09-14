import React from 'react';
import DefaultLayout from '~/components/layout/DefaultLayout';

const index = () => {
    return <div>index</div>;
};

export default index;

index.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

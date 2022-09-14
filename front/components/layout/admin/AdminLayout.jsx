import React from 'react';
import ContentBS from './ContentBS';
import HeaderBS from './HeaderBS';
import SiderBS from './SiderBS';
import { Layout } from 'antd';
import FooterBS from '../FooterBS';

const AdminLayout = ({ children }) => {
    return (
        <>
            <Layout hasSider>
                <SiderBS />
                <Layout className='site-layout' style={{ marginLeft: 200 }}>
                    <HeaderBS />
                    <ContentBS>{children}</ContentBS>
                    <FooterBS />
                </Layout>
            </Layout>
        </>
    );
};

export default AdminLayout;

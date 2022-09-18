import { Layout } from 'antd';
import React from 'react';
import FooterBS from './FooterBS';

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    return (
        <Layout className='layout'>
            <Content style={{ padding: '50px 50px', minHeight: '93vh', overflowY: 'scroll', maxHeight: '100vh' }}>
                <div className='site-layout-content'>{children}</div>
            </Content>
            <FooterBS />
        </Layout>
    );
};

export default DefaultLayout;

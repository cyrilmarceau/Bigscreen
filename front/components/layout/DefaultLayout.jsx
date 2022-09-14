import { Layout } from 'antd';
import React from 'react';
import FooterBS from './FooterBS';

const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
    return (
        <Layout className='layout'>
            <Content style={{ padding: '0 50px' }}>
                <div className='site-layout-content'>{children}</div>
            </Content>
            <FooterBS />
        </Layout>
    );
};

export default DefaultLayout;

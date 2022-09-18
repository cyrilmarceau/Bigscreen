import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const ContentBS = ({ children }) => {
    return (
        <Content style={{ overflowY: 'scroll', maxHeight: '90vh' }}>
            <div className='site-layout-background' style={{ padding: 24 }}>
                {children}
            </div>
        </Content>
    );
};

export default ContentBS;

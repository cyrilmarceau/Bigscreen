import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const ContentBS = ({ children }) => {
    return (
        <Content style={{ padding: '0 50px' }}>
            <div className='site-layout-background' style={{ padding: 24 }}>
                {children}
            </div>
        </Content>
    );
};

export default ContentBS;

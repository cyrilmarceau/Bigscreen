import React, { useId } from 'react';
import { FileUnknownOutlined, HomeOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const SiderBS = () => {
    const items = [
        {
            key: useId(),
            icon: <HomeOutlined />,
            label: 'Accueil',
        },
        {
            key: useId(),
            icon: <FileUnknownOutlined />,
            label: 'Questionnaire',
        },
        {
            key: useId(),
            icon: <FileDoneOutlined />,
            label: 'Réponse',
        },
    ];

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}>
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
};

export default SiderBS;

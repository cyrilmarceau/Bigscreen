import React from 'react';
import { FileUnknownOutlined, HomeOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';

const { Sider } = Layout;

const SiderBS = () => {

    const router = useRouter();

    const items = [
        {
            key: '/administration/home',
            icon: <HomeOutlined />,
            label: 'Accueil',
        },
        {
            key: '/administration/questions',
            icon: <FileUnknownOutlined />,
            label: 'Questionnaire',
        },
        {
            key: '/administration/surveyeds',
            icon: <FileDoneOutlined />,
            label: 'Réponses',
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
            <div className='big-screen-logo'>  
                <img src="/big-screen-light.png" alt="Big Screen" />
            </div>
            <Menu 
                theme='dark' 
                mode='inline' 
                defaultSelectedKeys={['/administration/home']} 
                onClick={(el) => router.push(el.key)} 
                items={items} />
        </Sider>
    );
};

export default SiderBS;

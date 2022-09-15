import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { LogoutOutlined, LeftOutlined } from '@ant-design/icons';
const { Header } = Layout;
import { useRouter } from 'next/router';

const HeaderBS = () => {
    const router = useRouter();
    console.log(router);
    return (
        <>
            <Header className='site-layout-background' style={{ padding: 0 }}>
                <Row justify='space-between header-inner-container'>
                    <Col md={12}>
                        <div onClick={() => router.back()} className='header-inner-container-title' style={{ marginBottom: 0, cursor: 'pointer' }}>
                            <LeftOutlined />
                        </div>
                    </Col>
                    <Col md={12} flex='0'>
                        <Button type='danger' shape='round' icon={<LogoutOutlined />} size='md'>
                            Se déconnecter
                        </Button>
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default HeaderBS;

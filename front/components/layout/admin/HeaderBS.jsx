import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;

const HeaderBS = () => {
    return (
        <>
            <Header className='site-layout-background' style={{ padding: 0 }}>
                <Row justify='space-between'>
                    <Col md={12}>
                        <h1 style={{ marginBottom: 0 }}>Bigscreen</h1>
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

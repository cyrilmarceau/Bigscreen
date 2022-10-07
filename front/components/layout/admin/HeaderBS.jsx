import React, { useState } from 'react';
import { Layout, Button, Row, Col, Modal } from 'antd';
import { LogoutOutlined, LeftOutlined } from '@ant-design/icons';
const { Header } = Layout;
import { useRouter } from 'next/router';
import API from '~/api';
import Helper from '~/helpers';
import { useAuth } from '~/contexts/authContext';

const HeaderBS = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const auth = useAuth();

    const logout = async () => {
        try {
            const result = await API.logout();

            if (result.success) {
                Helper.removeItem('authToken');
                auth.setIsAuthenticated(false);

                router.push('/administration');
            }
        } catch (error) {
            console.log('err', error);

            return;
        }
    };

    const confirm = () => {
        Modal.confirm({
            title: 'Voulez-vous vous déconnecter ?',
            okText: 'Oui',
            cancelText: 'Non',
            onOk: logout,
            onCancel: () => setOpen(false),
        });
    };

    return (
        <>
            <Header className='site-layout-background' style={{ padding: 0 }}>
                <Row justify='space-between header-inner-container'>
                    <Col md={12}>
                        <div onClick={() => router.back()} className='header-inner-container-title' style={{ marginBottom: 0, cursor: 'pointer' }} aria-label="Retour en arrière">
                            <LeftOutlined />
                        </div>
                    </Col>
                    <Col md={12} flex='0'>
                        <Button onClick={confirm} type='danger' shape='round' icon={<LogoutOutlined />} size='md' aria-label="Se déconnecter">
                            Se déconnecter
                        </Button>
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default HeaderBS;

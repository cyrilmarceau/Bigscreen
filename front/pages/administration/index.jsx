import { Row, Col, Button, Form, Input } from 'antd';
import API from '~/api';
import Helper from '~/helpers';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const login = async (values) => {

        setLoading(true);

        try {
            
            const response = await API.login(values);

            if (response.success) {
                
                const { token } = response.data;

                Helper.setItem('authToken', token);

                router.push('/administration/home').then(() => setLoading(false));
            }
        } catch (error) {

            setLoading(false);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='page-container'>
                <Row justify='center' align='middle' className='login-form-container'>
                    <Col xs={24} sm={16} lg={8} justify='center' align='middle' className='card login-form-card'>
                        
                        <div className='big-screen-logo'>  
                            <img src="/big-screen-dark.png" alt="Big Screen" />
                        </div>

                        <p className='login-form-paragraph'>Me connecter</p>

                        <Form name='basic' initialValues={{ remember: true }} layout='vertical' autoComplete='off' onFinish={login}>
                            <Form.Item
                                className='form-field'
                                label='Email'
                                name='email'
                                align='middle'
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Votre email est requis' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className='form-field'
                                label='Password'
                                name='password'
                                align='middle'
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Mots de passe obligatoire' }]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type='primary' htmlType='submit' loading={loading}>
                                    Connexion
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LoginPage;

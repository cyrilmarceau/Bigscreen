import { Row, Col, Button, Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    
    const login = (values) => {
    
        axios.post('http://127.0.0.1:8000/api/login', values).then(res => console.log(res));
    }

    return ( 
        <>
            <div className="page-container">

                <Row justify="center" align="middle" className="login-form-container">

                    <Col xs={24} sm={16} lg={8} justify="center" align="middle" className="login-form-card">

                        <h1 className="login-form-title">Big Screen</h1>

                        <p class="login-form-paragraph">Me connecter</p>

                        <Form
                            className="login-form-fields-group"
                            name="basic"
                            initialValues={{ remember: true }}
                            layout="vertical"
                            autoComplete="off"
                            onFinish={login}
                            >

                            <Form.Item
                                className="form-field"
                                label="Email"
                                name="email"
                                align="middle"
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Veuillez rentrer votre email !' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className="form-field"
                                label="Password"
                                name="password"
                                align="middle"
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Veuillez rentrer votre mots de passe !' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}
 
export default Login;

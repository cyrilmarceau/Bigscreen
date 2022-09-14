import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    
    const login = (values) => {
    
        axios.post('http://127.0.0.1:8000/api/login', values).then(res => console.log(res));
    }

    return ( 
        <>
            <section className='page-container'>
                
                <div className="login-form-container">

                    <div className="login-form">

                        <h1 className="login-form-title">Big screen</h1>

                        <Form
                            className="login-form-fields-group"
                            name="basic"
                            labelCol={{ offset: 10, span: 16 }}
                            initialValues={{ remember: true }}
                            layout="vertical"
                            autoComplete="off"
                            onFinish={login}
                            >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your mail!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item className="login-form-submit" wrapperCol={{ offset: 10, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Login;

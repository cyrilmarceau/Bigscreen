import { Row, Col, Button, Form, Input } from 'antd';
import API from '~/api';
import Helper from '~/helpers';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();
    
    const login = async (values) => {
    
        try {

            const response = await API.login(values);

            if(response.success) {

                const { token } = response.data

                Helper.setItem("authToken", token);

                router.push("/administration/home");
            }

        } catch (error) {
            return;
        }
    }

    return ( 
        <>
            <div className="page-container">

                <Row justify="center" align="middle" className="login-form-container">

                    <Col xs={24} sm={16} lg={8} justify="center" align="middle" className="login-form-card">

                        <h1 className="login-form-title">Big Screen</h1>

                        <p className="login-form-paragraph">Me connecter</p>

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

import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import API from "~/api";

const SurveyedForm = () => {

    const [questions, setQuestions] = useState();

    const login = (values) => {
      
        console.log(values);
    };

    const renderInput = (question) => {

        if( question.type === "A") {

            const answerOptions = JSON.parse(question.options);

            return (
                <Select>
                    {answerOptions.map(answerOption => <Select.Option value={answerOption.key}>{answerOption.value}</Select.Option>)}
                </Select>
            );
        }
        
        else if( question.type === "B") {
            return <Input />
        }

        else {
            return <InputNumber />
        }
    }

    useEffect(() => {
        
        API.getQuestions().then(res => setQuestions(res.data))
    }, []);

    return ( 
        <div className="surveyed-form">
            {questions ? (
                <>

                    <Col span={20} justify='center' align="middle" className="card header-card">

                        <h1 className="surveyed-form-title">Big Screen</h1>

                        <p className="surveyed-form-paragraph">Merci de répondre à toutes les questions et de valider le formulaire en bas de page</p>
                    </Col>

                    <Form
                        initialValues={{ remember: true }}
                        layout="vertical"
                        onFinish={login}>

                            { questions.map(question => (

                                    <Row justify='center' key={uuidv4()}>

                                        <Col span={20} justify='center' align="middle" className="card question-card">

                                            <h2>Question {question.title}</h2>

                                            <Form.Item align='middle' label={question.content}>
                                                {renderInput(question)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                            )) }

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button className="surveyed-form-submit" type='primary' htmlType='submit'>
                                    Envoyer
                                </Button>
                            </Form.Item>
                    </Form>
                </>
            ) : (
                <div className="loading-view">Chargement...</div>
            )}
        </div>
     );
}
 
export default SurveyedForm;
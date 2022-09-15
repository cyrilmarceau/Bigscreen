import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { useId } from 'react';

const SurveyedForm = ({ questions }) => {
    const mapId = useId();

    const submitSurveyed = (values) => {
        let surveyedData = [];

        for (const key in values) {
            surveyedData.push({
                questionId: key,
                content: values[key],
            });
        }

        console.log(surveyedData);
    };

    const renderInput = (question) => {
        if (question.type === 'A') {
            const answerOptions = JSON.parse(question.options);

            return (
                <Select placeholder='Sélectionner une réponse'>
                    {answerOptions.map((answerOption, index) => (
                        <Select.Option value={answerOption.key} key={`${mapId}-${index}`}>
                            {answerOption.value}
                        </Select.Option>
                    ))}
                </Select>
            );
        } else if (question.type === 'B') {
            return <Input maxLength={255} />;
        } else {
            return <InputNumber min='1' max='5' />;
        }
    };

    return (
        <div className='surveyed-form'>
            <>
                <Col span={20} justify='center' align='middle' className='card header-card'>
                    <h1 className='surveyed-form-title'>Big Screen</h1>

                    <p className='surveyed-form-paragraph'>Merci de répondre à toutes les questions et de valider le formulaire en bas de page</p>
                </Col>

                <Form initialValues={{ remember: true }} layout='vertical' onFinish={submitSurveyed}>
                    {questions.map((question, index) => (
                        <Row justify='center' key={`${mapId}-${index}`}>
                            <Col span={20} justify='center' align='middle' className='card question-card'>
                                <h2>Question {question.title}</h2>

                                <Form.Item
                                    align='middle'
                                    label={question.content}
                                    name={index}
                                    extra={question.type === 'B' ? '255 caractères maximum' : ''}
                                    rules={[{ required: true, message: 'Votre réponse est requise' }]}>
                                    {renderInput(question)}
                                </Form.Item>
                            </Col>
                        </Row>
                    ))}

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button className='surveyed-form-submit' type='primary' htmlType='submit'>
                            Envoyer
                        </Button>
                    </Form.Item>
                </Form>
            </>
        </div>
    );
};

export default SurveyedForm;

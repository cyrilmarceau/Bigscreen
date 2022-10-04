import { Button, Col, Form, Input, InputNumber, Row, Select, Radio } from 'antd';
import React, { useId } from 'react';
import API from '~/api';
import CardQuestion from './CardQuestion';

const SurveyedForm = ({ questions, submitSurveyed, submitFailed }) => {
    const mapId = useId();

    const renderInput = (question) => {
        if (question.type === 'A') {
            const answerOptions = JSON.parse(question.options);

            if (answerOptions.length === 2) {
                return (
                    <Radio.Group>
                        {answerOptions.map((answerOption, index) => (
                            <Radio value={answerOption.key} key={`${mapId}-${index}`}>
                                {answerOption.value}
                            </Radio>
                        ))}
                    </Radio.Group>
                );
            }

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
            return <Input type='text' maxLength={255} />;
        } else {
            return <InputNumber defaultValue='1' type='number' min='1' max='5' />;
        }
    };

    const getValidationRules = (question) => {
        let validationRules = [{ required: true, message: 'Votre réponse est requise' }];

        if (question.id === 1) {
            validationRules.push({ type: 'email', message: 'Veuillez rentrer une adresse mail valide' });
        }

        if (question.type === 'C') {
            validationRules.push({ type: 'number', min: 1, max: 5, message: 'Veuillez rentrer un nombre compris entre 1 et 5' });
        }

        return validationRules;
    };

    return (
        <div className='surveyed-form'>
            <>
                <Col span={20} justify='center' align='middle' className='card header-card'>
                    <h1 className='surveyed-form-title'>Big Screen</h1>

                    <p className='surveyed-form-paragraph'>Merci de répondre à toutes les questions et de valider le formulaire en bas de page</p>
                </Col>

                <Form
                    initialValues={{ remember: true }}
                    layout='vertical'
                    onFinish={submitSurveyed}
                    onFinishFailed={submitFailed}
                    requiredMark={false}>
                    {questions.map((question, index) => (
                        <Row key={index}>
                            <CardQuestion title={question.title} content={question.content} key={index}>
                                <Form.Item
                                    align='middle'
                                    name={index}
                                    extra={question.type === 'B' ? '255 caractères maximum' : ''}
                                    rules={getValidationRules(question)}>
                                    {renderInput(question)}
                                </Form.Item>
                            </CardQuestion>
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

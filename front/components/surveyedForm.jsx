import { Button, Form, Input, InputNumber, Row, Select, Radio, Card } from 'antd';
import React, { useId } from 'react';
import CardQuestion from './CardQuestion';

const SurveyedForm = ({ questions, submitSurveyed, submitFailed, loading }) => {
    const mapId = useId();

    const initialValues = {
        '3': 1,
        '8': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 'yes',
        '16': 'yes',
        '17': 'yes',
        '18': 'yes',
    };

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
            return <InputNumber type='number' min='1' max='5' />;
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
        <Form
            className='surveyed-form'
            initialValues={initialValues}
            layout='vertical'
            onFinish={submitSurveyed}
            onFinishFailed={submitFailed}
            requiredMark={false}>
            {questions.map((question, index) => (
                <React.Fragment key={index}>
                    <CardQuestion title={question.title} content={null} key={index} loading={loading}>
                        <Form.Item
                            label={
                                <label style={{ fontWeight: 'bold', fontSize: '1.3rem' }} aria-label={question.content}>
                                    {question.content}
                                </label>
                            }
                            align='left'
                            name={index}
                            extra={question.type === 'B' ? '255 caractères maximum' : ''}
                            rules={getValidationRules(question)}>
                            {renderInput(question)}
                        </Form.Item>
                    </CardQuestion>
                </React.Fragment>
            ))}

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button className='surveyed-form-submit' type='primary' htmlType='submit' loading={loading}>
                    Envoyer
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SurveyedForm;

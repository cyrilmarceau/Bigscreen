import { Col, Row, message, Modal } from 'antd';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import API from '~/api';
import DefaultLayout from '~/components/layout/DefaultLayout';
import SurveyedForm from '~/components/surveyedForm';

const ClientSurveyedFormPage = () => {
    const [questions, setQuestions] = useState(null);

    const getClientQuestions = async () => {
        try {
            const response = await API.getClientQuestions();

            if (response.success) {
                setQuestions(response.data);
            }
        } catch (error) {
            console.log('err', error);
            return;
        }
    };

    const submitSurveyed = async (values) => {
        let obj = {};

        let surveyedData = [];

        for (const key in values) {
            obj.email = values[0];
            surveyedData = [...surveyedData, { questionId: parseInt(key) + 1, content: values[key] }];
        }

        obj.questions = [...surveyedData];

        try {
            const response = await API.createSurveyed(obj);
            console.log('responses', response);
            if (response.success) {
                Modal.success({
                    title: 'Votre réponse a bien été reçue',
                    content: (
                        <p>
                            Toute l’équipe de Bigscreen vous remercie pour votre engagement. Grâce à votre investissement, nous vous préparons une
                            application toujours plus facile à utiliser, seul ou en famille. Si vous désirez consulter vos réponse ultérieurement,
                            vous pouvez consultez cette adresse:{' '}
                            <a href={`http://localhost:3000/surveyed/${response.data.slug}`}>http://localhost:3000/surveyed/{response.data.slug}</a>
                        </p>
                    ),
                });
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getClientQuestions();
    }, []);

    return (
        <div className='surveyed-index'>
            <Row justify='center' className='page-container'>
                <Col span={16} justify='center' align='middle'>
                    {!isNil(questions) ? (
                        <SurveyedForm submitSurveyed={submitSurveyed} questions={questions} />
                    ) : (
                        <div className='loading-view'>Chargement...</div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ClientSurveyedFormPage;

ClientSurveyedFormPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

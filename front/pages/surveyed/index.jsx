import { Col, Row, message, Modal } from 'antd';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import API from '~/api';
import DefaultLayout from '~/components/layout/DefaultLayout';
import SkeletonCard from '~/components/SkeletonCard';
import SurveyedForm from '~/components/surveyedForm';
import SurveyedTitle from '~/components/SurveyedTitle';

/**
 * ClientSurveyedFormPage:
 * 
 * Component for client surveyed.
 * Contains list of questions and callback functions for surveyed form.
 */
const ClientSurveyedFormPage = () => {

    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * getClientQuestions:
     * 
     * Fetching questions list.
     * 
     * @returns 
     */
    const getClientQuestions = async () => {

        try {

            const response = await API.getClientQuestions();

            if (response.success) {
                setQuestions(response.data);
            }
        } catch (error) {
            return;
        }
    };

    /**
     * submitSurveyed:
     * 
     * Format and sumbit surveyed data
     * and isplay pop-up for request sucess or error.
     * 
     * @returns
     */
    const submitSurveyed = async (values) => {

        setLoading(true);

        let obj = {};

        let surveyedData = [];

        for (const key in values) {
            obj.email = values[0];
            surveyedData = [...surveyedData, { questionId: parseInt(key) + 1, content: values[key] }];
        }

        obj.questions = [...surveyedData];

        try {

            const response = await API.createSurveyed(obj);

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
                    )
                });

                setLoading(false);
            }
        } catch (error) {
            message.error(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    /**
     * submitFailed:
     * 
     * Display error message on form submission with blank field(s).
     * 
     * @returns 
     */
    const submitFailed = () => message.error("Erreur de validation du questionnaire: Veuillez répondre à l'ensemble des questions");

    useEffect(() => {
        getClientQuestions();
    }, []);

    return (

        <Row justify='center' className='page-container surveyed-index'>

            <SurveyedTitle>
                <h2 className='surveyed-form-paragraph'>Merci de répondre à toutes les questions et de valider le formulaire en bas de page</h2>
            </SurveyedTitle>

            <Col 
                span={24} 
                justify='center' 
                align='middle'>

                {!isNil(questions) ? (
                    <SurveyedForm 
                        submitSurveyed={submitSurveyed} 
                        submitFailed={submitFailed} 
                        questions={questions} 
                        loading={loading} />
                ) : (
                    <SkeletonCard />
                )}
            </Col>
        </Row>
    );
};

export async function getStaticProps(context) {
    return {
        props: {
            protected: false,
        },
    };
}

export default ClientSurveyedFormPage;

ClientSurveyedFormPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

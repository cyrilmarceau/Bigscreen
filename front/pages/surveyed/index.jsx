import { Col, Row, Card, Skeleton, Meta, message, Modal } from 'antd';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import API from '~/api';
import DefaultLayout from '~/components/layout/DefaultLayout';
import SurveyedForm from '~/components/surveyedForm';

const ClientSurveyedFormPage = () => {

    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);

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
                    ),
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

    const submitFailed = () => message.error("Erreur de validation du questionnaire: Veuillez répondre à l'ensemble des questions");

    const renderSkeleton = () => {

        let skeletons = [];

        for(let i = 0; i < 10; i++) {

           skeletons.push(
                <Col 
                    xs={24} 
                    md={24} 
                    lg={24} 
                    xl={14} 
                    xxl={14} 
                    justify='center' 
                    align='start' 
                    style={{ margin: 'auto' }}>

                    <Card style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                        
                        <Skeleton loading={true} active>
                            <Meta title description />
                        </Skeleton>
                    </Card>
                </Col>
           )
        }

        return skeletons;
    }

    useEffect(() => {
        getClientQuestions();
    }, []);

    return (

        <div className='surveyed-index'>

            <Row justify='center' className='page-container'>

                <Col span={20} justify='center' align='middle' className='card header-card'>

                    <h1 className='header-title'>Big Screen</h1>

                    <p className='header-paragraph'>Merci de répondre à toutes les questions et de valider le formulaire en bas de page</p>
                </Col>

                <Col span={24} justify='center' align='middle'>
                    
                    {!isNil(questions) ? (
                        <SurveyedForm 
                            submitSurveyed={submitSurveyed} 
                            submitFailed={submitFailed} 
                            questions={questions} 
                            loading={loading} />
                        ) : (
                            <>
                                {renderSkeleton().map((skeleton, index) => <Row key={index}>{skeleton}</Row>)}
                            </>  
                        )
                    }
                </Col>
            </Row>
        </div>
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

import { Col, Row } from 'antd';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import API from '~/api';
import DefaultLayout from '~/components/layout/DefaultLayout';
import SurveyedForm from '~/components/surveyedForm';

const index = () => {

    const [questions, setQuestions] = useState(null);

    const getQuestions = async () => {

        try {

            const response = await API.getQuestions();

            if (response.success) {

                setQuestions(response.data);
            }
       } catch (error) {
            return;
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        
        <div className="surveyed-index">

            <Row justify='center' className='page-container'>

                <Col span={16} justify='center' align="middle">

                    {!isNil(questions) ? ( <SurveyedForm questions={questions} /> ) : ( <div className="loading-view">Chargement...</div> )}
                </Col>
            </Row>
        </div>
    );
};

export default index;

index.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

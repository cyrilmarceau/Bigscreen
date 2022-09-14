import { Col, Row } from 'antd';
import React from 'react';
import DefaultLayout from '~/components/layout/DefaultLayout';
import SurveyedForm from '~/components/surveyedForm';

const index = () => {

    return (
        
        <div className="surveyed-index">

            <Row justify='center' className='page-container'>

                <Col span={16} justify='center' align="middle">

                    <SurveyedForm />
                </Col>
            </Row>
        </div>
    );
};

export default index;

index.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

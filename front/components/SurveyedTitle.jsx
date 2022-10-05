import React from 'react';
import { Row, Col, Card, Skeleton, Meta } from 'antd';

const SurveyedTitle = ({ children }) => {
    return (
        <Col
            xs={14}
            md={14}
            lg={14}
            xl={14}
            xxl={14}
            justify='center'
            align='middle'
            className='card header-card'
            style={{ margin: 'auto', marginBottom: 30 }}>
            <h1 className='header-title'>Big Screen</h1>

            {children}
        </Col>
    );
};

export default SurveyedTitle;

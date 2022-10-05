import React from 'react';
const { Meta } = Card;
import { Col, Card } from 'antd';

const CardQuestion = ({ title, content, span = 24, children }) => {

    return (
        <Col xs={span} md={24} lg={24} xl={14} xxl={14} justify='center' align='start' style={{ margin: 'auto' }}>
            <Card
                title={`Question ${title}`}
                headStyle={{ fontWeight: 'bold', fontSize: '1rem' }}
                bordered
                style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                <Meta title={`${content}`} style={{ marginBottom: 5 }} />
                {children}
            </Card>
        </Col>
    );
};

export default CardQuestion;

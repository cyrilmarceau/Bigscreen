import React from 'react';
const { Meta } = Card;
import { Row, Col, Card } from 'antd';

const CardQuestion = ({ title, content, span = 24, children }) => {
    return (
        <Col xs={span} md={14} lg={14} xl={14} xxl={14} justify='center' align='start' style={{ margin: 'auto' }}>
            <Card
                title={`Question ${title}`}
                headStyle={{ fontWeight: 'bold' }}
                bordered
                style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                <Meta title={`${content}`} />
                {children}
            </Card>
        </Col>
    );
};

export default CardQuestion;

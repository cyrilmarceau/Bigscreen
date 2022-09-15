import React from 'react';
const { Meta } = Card;
import { Row, Col, Card } from 'antd';

const CardQuestion = ({ title, content, children }) => {
    return (
        <Col span={24} justify='center' align='start'>
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

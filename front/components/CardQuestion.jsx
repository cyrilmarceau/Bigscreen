import React from 'react';
const { Meta } = Card;
import { Row, Col, Card } from 'antd';

const CardQuestion = ({ title, content, span = 24, children }) => {
    return (
        <Col span={span} justify='center' align='start' style={span < 24 ? { margin: 'auto' } : null}>
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

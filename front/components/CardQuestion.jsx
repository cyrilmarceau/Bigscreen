import React from 'react';
const { Meta } = Card;
import { Col, Card, Row } from 'antd';
import _ from 'lodash';

const CardQuestion = ({ title, content, span = 24, children }) => {
    return (
        <Row>
            <Col xs={span} md={24} lg={24} xl={14} xxl={14} justify='center' align='start' style={{ margin: 'auto' }}>
                <Card
                    title={`Question ${title}`}
                    headStyle={{ fontWeight: 'normal', fontSize: '1rem' }}
                    bordered
                    style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                    {!_.isNil(content) && <Meta title={`${content}`} style={{ marginBottom: 5, fontSize: '2rem' }} />}

                    {children}
                </Card>
            </Col>
        </Row>
    );
};

export default CardQuestion;

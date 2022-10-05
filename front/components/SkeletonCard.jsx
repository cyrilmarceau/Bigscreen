import React from 'react';
import { Col, Row, Card, Skeleton, Meta, message, Modal } from 'antd';

const SkeletonCard = () => {
    const renderSkeleton = () => {
        let skeletons = [];

        for (let i = 0; i < 10; i++) {
            skeletons.push(
                <Col xs={24} md={24} lg={24} xl={14} xxl={14} justify='center' align='start' style={{ margin: 'auto' }}>
                    <Card style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                        <Skeleton loading={true} active>
                            <Meta title description />
                        </Skeleton>
                    </Card>
                </Col>
            );
        }

        return skeletons.map((skeleton, index) => <Row key={index}>{skeleton}</Row>);
    };

    return renderSkeleton();
};

export default SkeletonCard;

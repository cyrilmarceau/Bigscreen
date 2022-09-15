import React, { useState, useEffect } from 'react';
import DefaultLayout from '~/components/layout/DefaultLayout';
import API from '~/api';
import { useRouter } from 'next/router';
import CardQuestion from '~/components/CardQuestion';

import { Row, Col } from 'antd';
import { isNil } from 'lodash';
import Helper from '~/helpers';

const ClientSurveyedPage = () => {
    const [surveyed, setSurveyed] = useState(null);
    const router = useRouter();

    const { slug } = router.query;

    const getSurveyed = async () => {
        try {
            const response = await API.getSurveyedBySlug(slug);

            if (response.success) {
                setSurveyed(response.data);
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getSurveyed();
    }, [router.query.slug]);

    return (
        <Row>
            {!isNil(surveyed) && (
                <>
                    <Col span={20} justify='center' align='middle' className='card header-card'>
                        <h1 className=''>Big Screen</h1>

                        <h2 className=''>
                            Vous trouverez ce dessous les réponses que vous avez apportées à notre sondage le {Helper.formatDate(surveyed.created_at)}
                        </h2>
                    </Col>
                    {surveyed?.answers?.map((el) => {
                        return (
                            <CardQuestion key={el.id} title={el?.question?.title} content={el?.question?.content}>
                                <div style={{ borderStyle: 'dashed', marginTop: 15, padding: 10 }}>
                                    <span>{el.content}</span>
                                </div>
                            </CardQuestion>
                        );
                    })}
                </>
            )}
        </Row>
    );
};

export default ClientSurveyedPage;

ClientSurveyedPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

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
            if (!isNil(slug)) {
                router.push('/surveyed');
            }
        }
    };

    const getAnswerContent = (answer) => {
        if (answer.question.type === 'A') {
            const questionOptions = JSON.parse(answer.question.options);

            return questionOptions.find((option) => option.key === answer.content).value;
        }

        return answer.content;
    };

    useEffect(() => {
        getSurveyed();
    }, [router.query.slug]);

    return (
        !isNil(surveyed) && (
            <Row>
                <Col span={14} justify='center' align='middle' className='card header-card' style={{ margin: 'auto', marginBottom: 30 }}>
                    <h1 className='surveyed-form-title'>Big Screen</h1>

                    <h2 className='surveyed-form-paragraph'>
                        Vous trouverez ci-dessous les réponses que vous avez apportées à notre sondage le {Helper.formatDate(surveyed.created_at)}
                    </h2>
                </Col>
                {surveyed?.answers?.map((el) => {
                    return (
                        <CardQuestion span={14} key={el.id} title={el?.question?.title} content={el?.question?.content}>
                            <div style={{ borderStyle: 'dashed', marginTop: 15, padding: 10 }}>
                                <span>{Helper.parseQuestionOption(el)}</span>
                            </div>
                        </CardQuestion>
                    );
                })}
            </Row>
        )
    );
};

export default ClientSurveyedPage;

ClientSurveyedPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

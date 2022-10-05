import React, { useState, useEffect } from 'react';
import DefaultLayout from '~/components/layout/DefaultLayout';
import API from '~/api';
import { useRouter } from 'next/router';
import CardQuestion from '~/components/CardQuestion';

import { Row, Col, Card, Skeleton, Meta } from 'antd';
import { isNil } from 'lodash';
import Helper from '~/helpers';

const ClientSurveyedPage = () => {

    const router = useRouter();
    const { slug } = router.query;

    const [surveyed, setSurveyed] = useState(null);

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

    const renderSkeleton = () => {

        let skeletons = [];

        for(let i = 0; i < 10; i++) {

           skeletons.push(
                <Col 
                    xs={24} 
                    md={24} 
                    lg={24} 
                    xl={14} 
                    xxl={14} 
                    justify='center' 
                    align='start' 
                    style={{ margin: 'auto' }}>

                    <Card style={{ borderRadius: 20, marginBottom: '25px', marginTop: '25px' }}>
                        
                        <Skeleton loading={true} active>
                            <Meta title description />
                        </Skeleton>
                    </Card>
                </Col>
           )
        }

        return skeletons;
    }

    useEffect(() => {
        getSurveyed();
    }, [router.query.slug]);

    return (
        <Row>
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
                    
                <h1 className='surveyed-form-title'>Big Screen</h1>


                <h2 className='surveyed-form-paragraph'>
                    Vous trouverez ci-dessous les réponses que vous avez apportées à notre sondage le {!isNil(surveyed) && Helper.formatDate(surveyed.created_at)}
                </h2>
            </Col>

            <Col span={24} justify='center' align='middle'>
                {!isNil(surveyed) ? (
                    <>
                        {surveyed?.answers?.map((el) => {
                                return (
                                    <Row>
                                        <CardQuestion key={el.id} title={el?.question?.title} content={el?.question?.content}>
                                            <div style={{ borderStyle: 'dashed', marginTop: 15, padding: 10 }}>
                                                <span>{Helper.parseQuestionOption(el)}</span>
                                            </div>
                                        </CardQuestion>
                                    </Row>
                                );
                            }
                        )}
                    </>
                ) : (
                    <>
                        {renderSkeleton().map((skeleton, index) => <Row key={index}>{skeleton}</Row>)}
                    </>
                )}
            </Col>
        </Row>
    );
};

export default ClientSurveyedPage;

// export async function getStaticProps(context) {
//     return {
//         props: {
//             protected: false,
//         },
//     };
// }

ClientSurveyedPage.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

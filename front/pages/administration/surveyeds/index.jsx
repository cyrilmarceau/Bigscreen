import React, { useEffect, useState } from 'react';
import API from '~/api';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Table } from 'antd';
import { isNil } from 'lodash';

const AdminSurveyedsPage = () => {
    const columns = [
        {
            title: 'N°',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Corps',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Réponses',
            dataIndex: 'response',
            key: 'response',
        },
    ];

    const [responses, setResponses] = useState(null);

    const getAnswers = async () => {
        try {
            const response = await API.getSurveyeds();

            if (response.success) {
                let answers = [];

                response?.data?.forEach((el) => {
                    el?.answers?.forEach((answer, i) => {
                        let arr = [];

                        let answerObj = {
                            title: answer?.question?.title,
                            content: answer?.question?.content,
                            response: answer?.content,
                        };

                        // arr.push(answerObj);
                        answers.push(answerObj);
                    });
                });

                console.log(answers);
                setResponses(answers);
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getAnswers();
    }, []);

    return responses?.map((el, i) => {
        console.log('el', el);
        // return <Table key={i} pagination={false} loading={!isNil(el) === false ? true : false} columns={columns} dataSource={el} />;
    });
};

export default AdminSurveyedsPage;

AdminSurveyedsPage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

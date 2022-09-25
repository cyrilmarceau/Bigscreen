import React, { useEffect, useState } from 'react';
import API from '~/api';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Table, Pagination } from 'antd';
import { isNil } from 'lodash';
import Helper from '~/helpers';

const AdminSurveyedsPage = () => {
    const columns = [
        {
            title: 'N°',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => <span>{record?.question?.title}</span>,
        },
        {
            title: 'Question',
            dataIndex: 'content',
            key: 'content',
            render: (_, record) => <span>{record?.question?.content}</span>,
        },
        {
            title: 'Réponse',
            dataIndex: 'response',
            key: 'response',
            render: (_, record) => <span>{!isNil(record) && Helper.parseQuestionOption(record)}</span>,
        },
    ];

    const [responses, setResponses] = useState(null);

    const getAnswers = async () => {
        try {
            const response = await API.getSurveyeds();

            if (response.success) {
                let answers = [];

                response?.data?.forEach((el) => {
                    let arr = [];
                    el?.answers?.forEach((answer) => {
                        // arr.push(answerObj); V1
                        answers.push(answer);
                    });
                    // answers.push(arr); V1
                });
                setResponses(answers);
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getAnswers();
    }, []);

    // return responses?.map((el, i) => { V1
    return (
        <Table
            style={{ marginTop: '25px', marginBottom: '25px' }}
            // key={i}
            pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20] }}
            loading={!isNil(responses) === false ? true : false}
            columns={columns}
            dataSource={responses}
        />
    );
    // });
};

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
        },
    };
}

export default AdminSurveyedsPage;

AdminSurveyedsPage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

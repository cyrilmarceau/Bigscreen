import React, { useEffect, useState } from 'react';
import API from '~/api';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Table } from 'antd';
import { isNil } from 'lodash';

const AdminQuestionsPage = () => {
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
            render: (_, record) => <span>{record?.content}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => <span>{record?.type}</span>,
        },
    ];

    const [questions, setQuestions] = useState(null);

    const getAdminQuestions = async () => {
        try {
            const response = await API.getAdminQuestions();

            if (response.success) {
                setQuestions(response.data);
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getAdminQuestions();
    }, []);

    return <Table 
            columns={columns} 
            dataSource={questions} 
            loading={!isNil(questions) === false ? true : false} />;
};

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
        },
    };
}

export default AdminQuestionsPage;

AdminQuestionsPage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

import React, { useEffect, useState } from 'react';
import API from '~/api';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Table } from 'antd';
import { isNil } from 'lodash';

const AdminQuestions = () => {
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
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    const [questions, setQuestions] = useState(null);

    const getAdminQuestions = async () => {
        try {
            const response = await API.getAdminQuestions();

            if (response.success) {
                console.log(response.data);
                setQuestions(response.data);
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        getAdminQuestions();
    }, []);

    return <Table loading={!isNil(questions) === false ? true : false} columns={columns} dataSource={questions} />;
};

export default AdminQuestions;

AdminQuestions.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

import React, { useEffect, useId, useState } from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Row, Col } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import API from '~/api';

const AdminHomePage = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const mapId = useId();
    const [charts, setCharts] = useState(null);

    useEffect(() => {
        getCharts();
    }, []);

    const getCharts = async () => {
        try {
            const response = await API.getCharts();

            if (response.success) {
                setCharts(response.data);
            }
        } catch (error) {
            return;
        }
    };

    const renderPie = (chart) => {
        const pieColors = [
            { background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' },
            { background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' },
            { background: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' },
            { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
            { background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
            { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
        ];

        const pieData = {
            labels: [],
            datasets: [
                {
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1,
                },
            ],
        };

        const index = 0;

        for (const response in chart.stats) {
            pieData.labels.push(response);
            pieData.datasets[0].data.push(chart.stats[response]);
            pieData.datasets[0].backgroundColor.push(pieColors[index].background);
            pieData.datasets[0].borderColor.push(pieColors[index].border);

            index++;
        }

        return pieData;
    };

    const renderRadar = () => {};

    const renderChart = (chart) => (chart.type === 'pie' ? renderPie(chart) : renderRadar());

    return (
        <div className='home'>
            <h1 className='home-page-title'>Statistiques des sondages</h1>

            {charts && (
                <Row gutter={16} justify='start' className='charts-container'>
                    {charts.map((chart, index) => {
                        return (
                            <Col span={12} justify='center' align='middle' key={`${mapId}-${index}`}>
                                <h2 className='charts-title'>{chart.content}</h2>

                                <Pie data={renderChart(chart)} />
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
};

export default AdminHomePage;

AdminHomePage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

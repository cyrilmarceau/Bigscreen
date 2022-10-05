import React, { useEffect, useId, useState } from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Row, Col, Empty, Spin } from 'antd';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Radar } from 'react-chartjs-2';
import API from '~/api';
import { isNil } from 'lodash';

const AdminHomePage = () => {

    const mapId = useId();

    ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend);

    const radarOption = {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

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

        chart.stats.forEach((data, index) => {
            pieData.labels.push(data.label);
            pieData.datasets[0].data.push(data.count);
            pieData.datasets[0].backgroundColor.push(pieColors[index].background);
            pieData.datasets[0].borderColor.push(pieColors[index].border);
        });

        return pieData;
    };

    const renderRadar = (chart) => {
        
        const radarData = {
            labels: [],
            datasets: [
                {
                    label: 'Satisfaction moyenne client',
                    data: [],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                },
            ],
        };

        chart.stats.forEach((data) => {
            radarData.labels.push(data.label);
            radarData.datasets[0].data.push(data.count);
        });

        return radarData;
    };

    const renderChart = (chart) => {
        return chart.type === 'pie' ? <Pie data={renderPie(chart)} /> : <Radar data={renderRadar(chart)} options={radarOption} />;
    };

    return (

        <div className='home'>

            <h1 className='home-page-title'>Statistiques des sondages</h1>

            {!isNil(charts) ? (

                <Row gutter={[32, 32]} justify='center' className='charts-row'>

                    {charts.map((chart, index) => {
                        return (
                            <Col className='chart-col' xs={24} lg={12} justify='center' align='middle' key={`${mapId}-${index}`}>

                                <div className='chart-container'>

                                    <h2 className='chart-title'>{chart.type === 'pie' ? chart.content : 'Satisfaction client'}</h2>

                                    <div className='chart'>{renderChart(chart)}</div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                )  : (
                    <Spin tip="Chargement..." size="large" />
                )
            }
        </div>
    );
};

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
        },
    };
}

export default AdminHomePage;

AdminHomePage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

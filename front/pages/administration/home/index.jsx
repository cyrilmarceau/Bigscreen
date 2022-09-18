import React, { useEffect, useState } from 'react';
import AdminLayout from '~/components/layout/admin/AdminLayout';
import { Row, Col } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import API from '~/api';

const AdminHomePage = () => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const ChartColorList = [
        {background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)'},
        {background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)'},
        {background: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)'},
        {background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)'},
        {background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)'},
        {background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)'}
    ]

    const [charts, setCharts] = useState(null);

    useEffect(() => {

        getCharts();
    }, [])

    const getCharts = async () => {

        const response = await API.getCharts();

        setCharts(response);
    }

    const renderPie = () => {

    }

    const renderRadar = () => {
        
    }

    const renderChart = () => {

    }

    // let chartsState = {...charts};

    // response.forEach(data => {

    //     for(response in data.stats) {

    //         chartsState.labels.push(response);
    //         chartsState.datasets[0].data.push(data.stats[response])
    //     }
    // })

    // {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [],
    //         backgroundColor: [],
    //         borderColor: [],
    //         borderWidth: 1,
    //       },
    //     ]
    // }

    // const data = {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    // }

    return (
        
        <div className="home">

            <h1 className="home-page-title">Statistiques des sondages</h1>

            <Row gutter={16} justify="start" className="charts-container">

                <Col span={12} justify='center' align='middle'>
                    
                    <h2 className="charts-title">Quelle marque de casque VR utilisez vous ?</h2>

                    {/* <Pie data={data} /> */}
                </Col>

                <Col span={12} justify='center' align='middle'>
                    
                    <h2 className="charts-title">Sur quelle magasin d'application achetez-vous des contenus VR ?</h2>

                    {/* <Pie data={data} /> */}
                </Col>
            </Row>
        </div>
    );
};

export default AdminHomePage;

AdminHomePage.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

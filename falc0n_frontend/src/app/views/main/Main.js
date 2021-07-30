import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';
import { Persentager } from '../../components/Persentager';
import { Progress } from '../../components/Progress';
import TopHeader from '../../components/TopHeader';



export function Main() {

    useEffect(() => {

        var chart = document.getElementById('chart').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 450);

        gradient.addColorStop(0, 'rgba(221, 129, 8, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 199, 214, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 199, 214, 0)');


        var data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Applications',
                backgroundColor: gradient,
                pointBackgroundColor: '#00c7d6',
                borderWidth: 1,
                fill: true,
                borderColor: '#0e1a2f',
                data: [60, 45, 80, 30, 35, 55, 25, 80, 40, 50, 80, 50]
            }]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: '#5e6a81'
                    },
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0.08)',
                        lineWidth: 1
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: '#5e6a81'
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            legend: {
                display: false
            },
            point: {
                backgroundColor: '#00c7d6'
            },
            tooltips: {
                titleFontFamily: 'Poppins',
                backgroundColor: 'rgba(0,0,0,0.4)',
                titleFontColor: 'white',
                caretSize: 5,
                cornerRadius: 2,
                xPadding: 10,
                yPadding: 10
            }
        };
        // eslint-disable-next-line
        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });
    }, [])




    return (
        <div className="app-main">
            <TopHeader />
            <div className="chart-row three">
                <Persentager title={"revenue"} revenue={20} persentage={"70"} color={"red"} />
                <Persentager title={"total"} revenue={5.5} persentage={"40"} color={"blue"} />
                <Persentager title={"On-hold"} revenue={10.5} persentage={"90"} color={"orange"} />
            </div>
            <div className="chart-row two">
                <div className="chart-container-wrapper big">
                    <div className="chart-container">
                        <div className="chart-container-header">
                            <h2>Top Active Products</h2>
                            <span>Last 30 days</span>
                        </div>
                        <div className="line-chart">
                            <canvas id="chart"></canvas>
                        </div>
                        <div className="chart-data-details">
                            <div className="chart-details-header"></div>
                        </div>
                    </div>
                </div>
                <div className="chart-container-wrapper small">
                    <Progress />
                    <div className="chart-container applicants">
                        <div className="chart-container-header">
                            <h2>RECENT SALES</h2>
                            <span>Today</span>
                        </div>
                        <div className="applicant-line">
                            <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                                alt="profile" />
                            <div className="applicant-info">
                                <span>Emma Ray</span>
                                <p>5 piece of Nice Book Genders <strong>Product Designer</strong></p>
                            </div>
                        </div>
                        <div className="applicant-line">
                            <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
                                alt="profile" />
                            <div className="applicant-info">
                                <span>Ricky James</span>
                                <p>Applied for <strong>IOS Developer</strong></p>
                            </div>
                        </div>
                        <div className="applicant-line">
                            <img src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                                alt="profile" />
                            <div className="applicant-info">
                                <span>Julia Wilson</span>
                                <p>Applied for <strong>UI Developer</strong></p>
                            </div>
                        </div>
                        <div className="applicant-line">
                            <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
                                alt="profile" />
                            <div className="applicant-info">
                                <span>Jess Watson</span>
                                <p>Applied for <strong>Design Lead</strong></p>
                            </div>
                        </div>
                        <div className="applicant-line">
                            <img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80"
                                alt="profile" />
                            <div className="applicant-info">
                                <span>John Pellegrini</span>
                                <p>Applied for <strong>Back-End Developer</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

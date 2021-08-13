import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const TotalChart = () => {

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

        return () => {
            chartInstance.destroy();
        }
    }, [])
    return (
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
    );
}

export default TotalChart;

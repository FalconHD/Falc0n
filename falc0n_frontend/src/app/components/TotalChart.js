import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';

const TotalChart = () => {

    const [reports, setReports] = useState([])
    const main = useSelector(state => state.main)
    const [mounths, setMounths] = useState([])
    const [sales, setSales] = useState([])
    const [year, setyear] = useState(null)
    const dispatch = useDispatch()



    useEffect(() => {
        if(main.yearSales.length>0){
            setReports(main.yearSales)
        }else{
            setMounths([])
            setSales([])
        }
    }, [main.yearSales])

    useEffect(() => {
        let final = [0, 0, 0, 0, 0, 0, 0, 0]
        if (reports.length > 0) {
            let mounth = Object.keys(reports[0])

            let Days = []
            mounth.map(day => {
                Days.push(day.split('-')[1])
            })
            let dayNumber = []
            Days.forEach((day, idx) => {
                dayNumber.push(+day)
                reports.forEach(store => {
                    final[idx] = final[idx] + +store[[`2021-${day}`]].sales;
                })
            });

            setMounths(dayNumber)
            setSales(final)
        }

    }, [reports])



    useEffect(() => {
 
        setyear(new Date().getFullYear())
        var chart = document.getElementById('chart').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 450);

        gradient.addColorStop(0, 'rgba(221, 129, 8, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 199, 214, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 199, 214, 0)');


        var data = {
            labels: mounths,
            datasets: [{
                label: 'Applications',
                backgroundColor: gradient,
                pointBackgroundColor: '#00c7d6',
                borderWidth: 1,
                fill: true,
                borderColor: '#0e1a2f',
                data: sales,
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
    }, [mounths,sales])
    return (
        <div className="chart-container-wrapper big">
            <div className="chart-container">
                <div className="chart-container-header">
                    <h2>Stores Revenue</h2>
                    <span>{year}</span>
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

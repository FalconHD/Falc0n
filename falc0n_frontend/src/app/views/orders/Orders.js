import React, { Suspense, useEffect, useState } from 'react'
// import { RightSidebar } from '../../components/RightSidebar'
import { StoreButton } from '../../components/StoreButton'
import TopHeader from '../../components/TopHeader'
import { useSelector, useDispatch } from 'react-redux';
import {
    select
} from './ordersSlice';
import Chart from 'chart.js/auto';
import StoreReports from '../../components/StoreReports';
import { addStatus } from '../stores/storesSlice';

const RightSidebar = React.lazy(() => import('../../components/RightSidebar'));
const ProductsTable = React.lazy(() => import('../../components/ProductsTable'));



export function Orders() {


    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [reportsSales, setReportsSales] = useState([])
    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => {
        setProducts(stores.selectedStore.products)
    }, [stores.selectedStore.products])

    const getYearlyReports = async () => {
        var d = new Date();
        var m = d.getMonth();
        var year = d.getFullYear();
        let id = stores.selectedStore.store.id
        let result = await fetch(`http://localhost/falc0n/store/getOrdersByAverage/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            },
            body: JSON.stringify({
                "start": "2021-07-15",
                "end": "2021-08-15"
            })
        })
        let data = await result.json()
        console.log('yearly',data[0]);
        data = data[0].totals
        let mounth = Object.keys(data)
        let order = []
        let Days = []
        mounth.map(day => {
            Days.push(day.split('-')[2])
            order.push(data[day].orders)
        })
        
        setReportsSales(Days)
        setOrders(order)
    }


    const getMonthlyReports = async () => {
        var d = new Date();
        var m = d.getMonth();
        var year = d.getFullYear();
        let id = stores.selectedStore.store.id
        let result = await fetch(`http://localhost/falc0n/store/getOrdersByAverageMin/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Token')}`
            },
            body: JSON.stringify({
                "start": "2021-01-01",
            })

        })


        let data = await result.json()
        console.log("mounthly",data[0]);
        dispatch(addStatus(data[0]))
    }

    useEffect(() => {

        var chart = document.getElementById('chart').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 450);

        gradient.addColorStop(0, 'rgba(221, 129, 8, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 199, 214, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 199, 214, 0)');


        var data = {
            labels: reportsSales,
            datasets: [{
                label: 'Orders',
                backgroundColor: gradient,
                pointBackgroundColor: '#00c7d6',
                borderWidth: 1,
                fill: true,
                borderColor: '#0e1a2f',
                data: orders
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
            type: 'bar',
            data: data,
            options: options
        });

        return () => {
            chartInstance.destroy();
        }
    }, [orders])

    useEffect(() => {
        let yes = false
        for (let key in stores.selectedStore.orders) {
            if (stores.selectedStore.orders.hasOwnProperty(key)) {
                yes = true
                break;
            }
        }
        console.log('orders :', yes);
        if (!yes) {
            getMonthlyReports()
            getYearlyReports()
        }
    }, [stores.selectedStore.store])


    return (
        <div class="stores-pages">
            <div className="app-main">
                <TopHeader />
                <StoreReports />
                <div className="store-chart">
                    <div className="chart-container">
                        <div className="chart-container-wrapper big">
                            <div className="chart-container-header">
                                <h2>Orders in July</h2>
                                <span>Last 30 days</span>
                            </div>
                            <div className="bar-chart">
                                <canvas id="chart" height="100px" ></canvas>
                            </div>
                            <div className="chart-data-details">
                                <div className="chart-details-header"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-container" style={{ color: 'white', display: 'flex', flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductsTable />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <RightSidebar />
            </Suspense>
        </div>
    )
}

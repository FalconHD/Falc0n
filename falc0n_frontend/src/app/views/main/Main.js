import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, resetHold, resetItems, resetTotal, updateTotal } from './mainSlice';

import Persentager from '../../components/Persentager';
import { Progress } from '../../components/Progress';
import TopHeader from '../../components/TopHeader';
import TotalChart from '../../components/TotalChart';
import { Suspense } from 'react';
import RecentOrders from '../../components/RecentOrders';


const Main = () => {

    const dispatch = useDispatch()
    const main = useSelector(state => state.main)
    const stores = useSelector(state => state.stores)
    const [Stores, setStores] = useState([])

    const getStores = async () => {
        let response = await fetch(`http://127.0.0.1:80/falc0n/store/stores`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        setStores(result)
    }

    useEffect(() => {
        getStores()
    }, [])

    useEffect(() => {
        dispatch(login({
            email: 'youssbak.2015@gmail.com',
            password: "123"
        }))

        // dispatch(
        //     register({
        //         username: "YOUSSEF",
        //         first_name: "youssef",
        //         cin: "zt233084",
        //         last_name: "El bakkouri",
        //         phone: "0649621172",
        //         email: "YOUSSef@GMAIL.COM",
        //         password: "123",
        //         num_stores: 0,
        //         image: "data:image/jpeg;base64,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"
        //     }))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(resetTotal())
            dispatch(resetItems())
            dispatch(resetHold())
        }
    }, [])

    return (
        <div className="app-main">
            <TopHeader />
            <div className="chart-row three">
                <Persentager title={"revenue"} revenue={`${main.total_sales}.00 $`} persentage={"70"} color={"red"} />
                <Persentager title={"total"} revenue={main.updateTotalItems} persentage={"40"} color={"blue"} />
                <Persentager title={"On-hold"} revenue={main.onHold} persentage={"90"} color={"orange"} />
            </div>
            <div className="chart-row two">
                <Suspense fallback={<h3>Loading....</h3>}>
                    <TotalChart />
                </Suspense>
                <div className="chart-container-wrapper small">
                    <Progress stores={Stores} />
                    <RecentOrders />
                </div>
            </div>
        </div>
    );
}

export default Main;

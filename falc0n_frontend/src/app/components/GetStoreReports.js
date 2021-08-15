import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../Hooks/useFetch'
import { updateTotal, updateTotalItems, updateYearlySales } from '../views/main/mainSlice';
import { getStoreReports } from '../views/main/mainSlice'
const { get, post, postWithUpload } = useFetch

const GetStoreReports = ({ store }) => {

    // const getMonthlyReports = async () => {
    //     var d = new Date();
    //     var m = d.getMonth();
    //     var year = d.getFullYear();
    //     let id = stores.selectedStore.store.id
    //     let result = await fetch(`http://127.0.0.1:80/falc0n/store/getOrdersByAverageMin/${id}`, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': "application/json",
    //             "Authorization": `Bearer ${localStorage.getItem('Token')}`
    //         },
    //         body: 
    //     })
    //     let data = await result.json()
    //     console.log("mounthly", data[0]);
    //     dispatch(addStatus(data[0]))
    // }

    const [state, setstate] = useState([])
    const dispatch = useDispatch()
    const main = useSelector(state => state.main)
    
    const reports = async () => {
        let body = {
            "start": "2021-01-01",
        }
        let data = await post(`store/getOrdersByAverageMin/${store.id}`, body)
        let res = await data.json()
        console.log(res[0].total_sales);
        dispatch(updateYearlySales(res[0].totals))
        dispatch(updateTotal(parseFloat(res[0].total_sales)))
        dispatch(updateTotalItems(parseFloat(res[0].total_orders)))
        setstate(res)

        dispatch(getStoreReports(parseInt(store.id)))
    }

    useEffect(() => {
        reports()
    }, [])
    return (
        <small>{Math.round((parseFloat(state[0]?.total_sales)*100) / parseFloat(main.total_sales))} %</small>
    )
}

export default GetStoreReports;

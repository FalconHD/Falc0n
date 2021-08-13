import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Persentager from './Persentager';
import { getStoreReports } from '../views/stores/storesSlice'


export default function StoreReports() {

    const [reports, setReports] = useState([])
    const [global, setGlobal] = useState({})

    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch()




    useEffect(() => {
        let yes = false
        for (let key in stores.selectedStore.orders) {
            if (stores.selectedStore.orders.hasOwnProperty(key)) {
                yes = true
                break;
            }
        }
        if (!yes) {
            dispatch(getStoreReports())
        }
    }, [stores.selectedStore.store])

    useEffect(() => {
        setGlobal(stores.selectedStore.status)
    }, [stores.selectedStore.status])

    useEffect(() => {
        setReports(stores.selectedStore.reports)
    }, [stores.selectedStore.reports])

    return (
        <>
            <div className="chart-row three">
                <Persentager title={"revenue"} revenue={global.total_sales} persentage={"70"} color={"red"} type={"$"} />
                <Persentager title={"total"} revenue={global.total_items} persentage={"100"} color={"blue"} type={"Items"} />
                <Persentager title={"On-hold"} revenue={reports[2]?.total || 0} persentage={reports[2] ? Math.ceil((reports[2].total / global.total_items) * 100) : 0} color={"orange"} type={"Items"} />
                <Persentager title={"refunded"} revenue={reports[5] ? reports[5].total : 0} persentage={reports[5] ? Math.ceil((reports[5].total / global.total_items) * 100) : 0} color={"refunded"} type={"Items"} />
            </div>
            <div className="chart-row three">
                <Persentager title={"pending"} revenue={reports[0] ? reports[0].total : 0} persentage={reports[0] ? Math.ceil((reports[0].total / global.total_items) * 100) : 0} color={"pending"} type={"Items"} />
                <Persentager title={"processing"} revenue={reports[1] ? reports[1].total : 0} persentage={reports[1] ? Math.ceil((reports[1].total / global.total_items) * 100) : 0} color={"processing"} type={"Items"} />
                <Persentager title={"completed"} revenue={reports[3] ? reports[3].total : 0} persentage={reports[3] ? Math.ceil((reports[3].total / global.total_items) * 100) : 0} color={"completed"} type={"Items"} />
                <Persentager title={"cancelled"} revenue={reports[4] ? reports[4].total : 0} persentage={reports[4] ? Math.ceil((reports[4].total / global.total_items) * 100) : 0} color={"cancelled"} type={"Items"} />
            </div>
        </>
    )
}

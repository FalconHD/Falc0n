import React, { Suspense, useEffect, useState } from 'react'
// import { RightSidebar } from '../../components/RightSidebar'
import { StoreButton } from '../../components/StoreButton'
import TopHeader from '../../components/TopHeader'
import { useSelector, useDispatch } from 'react-redux';
import {
    getCustomers
} from './customersSlice';
import Chart from 'chart.js/auto';
const RightSidebar = React.lazy(() => import('../../components/RightSidebar'));
const CustomersTable = React.lazy(() => import('../../components/CustomersTable'));



export function Customers() {


    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(stores.selectedStore.products)

    }, [stores.selectedStore])

    useEffect(() => {
        dispatch(getCustomers())
    }, [stores.selectedStore.store])


    useEffect(() => {


    }, [])


    return (
        <div class="stores-pages">
            <div className="app-main" >
                <TopHeader />

                <div style={{ overflowX: "scroll" }}>
                    <div className="chart-container" style={{ color: 'white', display: 'flex', flexWrap: "wrap", justifyContent: "center", gap: "10px", minWidth: "1000px" }}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <CustomersTable />
                        </Suspense>
                    </div>
                </div>

            </div>
            {/* <Suspense fallback={<div>Loading...</div>}>
                <RightSidebar />
            </Suspense> */}
        </div>
    )
}

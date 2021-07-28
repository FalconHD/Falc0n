import React, { useEffect, useState } from 'react'
import { RightSidebar } from '../../components/RightSidebar'
import { StoreButton } from '../../components/StoreButton'
import TopHeader from '../../components/TopHeader'
import { useSelector, useDispatch } from 'react-redux';
import {
    select
} from './storesSlice';


export function Stores() {


    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(stores.selectedStore.orders)
    }, [stores.selectedStore])


  

    return (
        <div class="stores-pages">
            <div className="app-main">
                <TopHeader />
                <div className="chart-container" style={{ color: 'white', display: 'flex', flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                    {orders.length > 0
                        ?
                        orders.map(order => (
                            <div key={order.id}>
                                <img src={order.images[0].src} style={{ width: "200px", height: "200px" }} /><br />
                                <small>{order.name}</small>
                            </div>
                        ))
                        : <h5>waiting for products</h5>
                    }
                </div>
            </div>
            <RightSidebar />
        </div>
    )
}

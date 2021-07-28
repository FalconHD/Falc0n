import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    select
} from '../views/stores/storesSlice';


export function StoreButton(props) {

    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const getOrders = async (id) => {
        let response = await fetch(`http://localhost/falc0n/store/getProducts/${id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        dispatch(select({store:props.store,orders:result}))
    }
    useEffect(() => {
        console.log(props);
    })


    return (
        <div className="chart-container-wrapper" onClick={() => getOrders(props.store.id)}>
            <div className="chart-container storeButton">
                <div className="chart-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-shopping-cart">
                        <circle cx="9" cy="21" r="1">
                        </circle>
                        <circle cx="20" cy="21" r="1">
                        </circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6">
                        </path>
                    </svg>
                </div>
                <div className="chart-info-wrapper">
                    <small>{props.title} STORE</small>
                </div>
                <div className="chart-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-arrow-right-circle">
                        <circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8">
                        </polyline><line x1="8" y1="12" x2="16" y2="12">
                        </line>
                    </svg>
                </div>
            </div>
        </div>
    )
}

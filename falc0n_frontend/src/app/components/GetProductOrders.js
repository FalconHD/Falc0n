import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addOrders,
    reset
} from '../views/stores/storesSlice';


export default function GetProductOrders(props) {
    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch()
    const [orders, setOrders] = useState(0)


    const getProductData = async (id) => {
        let store = stores.selectedStore.store.id
        const result = await fetch(`http://127.0.0.1:80/falc0n/store/getOrders/${store}/${id}`)
        const productData = await result.json()
        setOrders(productData.length)
    }

    useEffect(() => {
        getProductData(props.product.id)
    }, [])
    return (
        <p>{orders}</p>
    )
}

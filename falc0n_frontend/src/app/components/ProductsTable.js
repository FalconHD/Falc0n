import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addOrders,
    reset
} from '../views/stores/storesSlice';
import GetProductOrders from './GetProductOrders';




export default function DataTable() {

    const [productsData, setProductsData] = useState([])
    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch()



    useEffect(() => {
        setProductsData(stores.selectedStore.products)
    }, [stores.selectedStore.products])

    // useEffect(() => {
    //     setProductsData(stores.selectedStore.orders)
    // }, [stores.selectedStore.orders])


    return (

        <div>
            <section>
                <h4>STORE PRODUCS SAMMERY</h4>
                <div class="tbl-header">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imgae</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Orders</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            {
                                productsData.length > 0
                                    ?
                                    productsData.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>
                                                <div className="applicant-line productImg">
                                                    <img src={product.images[0].src} alt="product" />
                                                </div>
                                            </td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            {product.stock_status == 'instock' ?<td style={{color:"#7CFC00"}}>In Stock</td>:<td style={{color:"#DC143C"}}>Out of stock</td>}
                                            <td><GetProductOrders product={product} /></td>
                                            <td className="product-activity">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" class="feather feather-edit">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </td>
                                        </tr>
                                    ))

                                    : <small>No data to dispay </small>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>



    );
}

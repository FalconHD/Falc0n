import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCustomer
} from '../views/customers/customersSlice';
import {
    activateModal,
    modalData
} from '../views/Modal/modalSlice';
import GetProductOrders from './GetProductOrders';




export default function DataTable() {

    const [customers, setCustomers] = useState([])
    const customersStore = useSelector(state => state.customers)
    const dispatch = useDispatch()


    const selectedDeletedCustomer = (id) => {
        dispatch(modalData({
            action: "delete",
            infos: {
                message: "Are you sure you want to delete Customer with id :",
                id: id,
                target: "customer"
            }
        }))
        dispatch(activateModal(true))
    }

    useEffect(() => {
        setCustomers(customersStore.customers)
    }, [customersStore.customers])





    return (

        <div>
            <section>
                <h4>STORE PRODUCS SAMMERY</h4>

                <div class="tbl-content customers">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            {
                                customers?.length > 0 && customersStore.status == 'success'
                                    ?
                                    customers.map(customer => (
                                        <tr key={customer.id}>
                                            <td>
                                                <div className="applicant-line productImg">
                                                    <img src={customer.avatar_url} alt="customer" />
                                                </div>
                                            </td>
                                            <td>{customer.username}</td>
                                            <td>
                                                {customer.first_name}<br />
                                                {customer.last_name}
                                            </td>
                                            <td style={{ width: "200px" }}>{customer.email}</td>
                                            <td>{customer.billing.state}</td>
                                            <td>{customer.billing.city}</td>
                                            <td>{customer.billing.phone}</td>
                                            <td >0</td>
                                            <td className="product-activity" style={{ width: "30px" }}>
                                                <svg onClick={() => selectedDeletedCustomer(customer.id)} xmlns="http://www.w3.org/2000/svg" width="26" height="26"
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

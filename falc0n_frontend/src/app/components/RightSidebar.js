import React, { useEffect, useState } from 'react'
import { StoreButton } from './StoreButton'
import { useSelector, useDispatch } from 'react-redux';
import {
    select
} from '../views/stores/storesSlice';



export function RightSidebar() {
    const [mystores, setStores] = useState([])

    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const getOrders = async (store) => {
        let response = await fetch(`http://localhost/falc0n/store/getProducts/${store.id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        dispatch(select({ store: store, orders: result }))
    }


    const getStores = async () => {
        let response = await fetch(`http://localhost/falc0n/store/stores`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        setStores(result)
        getOrders(result[0])
    }

    useEffect(() => {
        getStores()
    }, []);



    return (
        <>
            <div class="app-right">
                <button class="close-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div class="profile-box">
                    <div class="profile-photo-wrapper">
                        <img src="https://images.unsplash.com/photo-1551292831-023188e78222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE0fHxwb3J0cmFpdHxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                            alt="profile" />
                    </div>
                    <p class="profile-text">Julia Pellegrini</p>
                    <p class="profile-subtext">Recruiting Manager</p>
                </div>
                <div class="app-right-content">
                    <div class="app-right-section">
                        <div class="app-right-section-header">
                            <h2>MY STORES :</h2>
                            <span class="notification-active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </span>
                        </div>
                        <div className="">
                            {
                                mystores.map(store => (
                                    <StoreButton getOrders={() => getOrders(store)} store={store} key={store.id} />
                                ))
                            }
                        </div>
                    </div>
                    {/* <div class="app-right-section">
                        <div class="app-right-section-header">
                            <h2>Activity</h2>
                            <span class="notification-active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-bell">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </span>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon warning">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-alert-circle">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">Your plan is expires in <strong>3 days.</strong></p>
                                <a class="activity-link" href="#">Renew Now</a>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon applicant">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-file-plus">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="12" y1="18" x2="12" y2="12" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">There are <strong>3 new applications</strong> for <strong>UI
                                    Developer</strong></p>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-x-circle">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">Your teammate, <strong>Wade Wilson</strong> has closed the job post
                                    of <strong>IOS Developer</strong></p>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon applicant">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-file-plus">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="12" y1="18" x2="12" y2="12" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">There are <strong>4 new applications</strong> for <strong>Front-End
                                    Developer</strong></p>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon applicant">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-file-plus">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="12" y1="18" x2="12" y2="12" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">There are <strong>2 new applications</strong> for <strong>Design
                                    Lead</strong></p>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-x-circle">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">Your teammate, <strong>Wade Wilson</strong> has closed the job post
                                    of <strong>Back-End Developer</strong></p>
                            </div>
                        </div>
                        <div class="activity-line">
                            <span class="activity-icon draft">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-file-minus">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </span>
                            <div class="activity-text-wrapper">
                                <p class="activity-text">You have drafted a job post for <strong>HR Specialist</strong></p>
                                <a href="#" class="activity-link">Complete Now</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

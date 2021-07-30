import React, { useEffect, useState } from 'react'
import { StoreButton } from './StoreButton'
import { useSelector, useDispatch } from 'react-redux';
import {
    select,
    rightSetActive,
} from '../views/stores/storesSlice';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        width: '100%',
    },
    input: {
        color: 'white',
        width: '100%',
        backgroundColor: '#151c32',
        fontSize: '13px',
    },
    label: {
        color: '#dd8108',
        fontSize: '13px',
        width: '100%'
    },
    button: {
        backgroundColor: '#dd8108',
        color: '#151c32',
        '&:hover': {
            backgroundColor: '#a8885e',
            boxShadow: 'none',
        },
    }

}));

export function RightSidebar() {
    const [addActivated, setAddActivated] = useState(true)
    const [mystores, setStores] = useState([])
    const [addStore, setAddStore] = useState({})

    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch();

    const location = useLocation()

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
    const classes = useStyles();




    const getStores = async () => {
        let response = await fetch(`http://localhost/falc0n/store/stores`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        setStores(result)
        let yes = false
        for (let key in stores.selectedStore.orders) {
            if (stores.selectedStore.orders.hasOwnProperty(key)) {
                yes = true
                break;
            }
        }
        if (!yes) {
            getOrders(result[0])
        }
    }

    const connect = async () => {
        let owner = 1
        let newStore = {
            store_name: addStore.name,
            url: addStore.url,
            owner
        }
        console.log(newStore);

        let response = await fetch('http://localhost/falc0n/store/add', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newStore)
        })
        let result = await response.json()
        response = await fetch(`http://localhost/falc0n/store/connect/${result.id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let { url } = await response.json()
        window.location.href = url
    }

    useEffect(() => {
        getStores()
    }, []);



    useEffect(() => {
        stores.sidebar.show ? document.querySelector('.app-right').classList.add('show') : document.querySelector('.app-right').classList.remove('show')
    }, [stores.sidebar.show]);

    return (
        <>
            <div class="app-right" >
                <button class="close-right" onClick={() => dispatch(rightSetActive(false))}>
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

                            <span className="my-stores-button" onClick={() => setAddActivated(true)}><h2>MY STORES</h2></span>
                            <span class="notification-active" onClick={() => setAddActivated(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </span>
                        </div>
                        <div className="">
                            {
                                addActivated
                                    ? mystores.map(store => (
                                        <StoreButton getOrders={() => getOrders(store)} store={store} key={store.id} />
                                    ))
                                    :
                                    <div className="link-store-form">
                                        <small>LINK NEW STORE :</small>
                                        <TextField fullWidth InputProps={{ className: classes.input }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="NAME" variant="filled" onChange={(e) => setAddStore({ ...addStore, name: e.target.value })} />
                                        <TextField fullWidth InputProps={{ className: classes.input }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="URL" variant="filled" onChange={(e) => setAddStore({ ...addStore, url: e.target.value })} />
                                        <Button fullWidth variant="contained" color="primary" href="#contained-buttons" className={classes.button} onClick={() => connect()}>
                                            Link
                                        </Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

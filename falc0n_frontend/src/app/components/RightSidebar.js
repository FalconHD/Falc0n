import React, { useEffect, useState } from 'react'
import { StoreButton } from './StoreButton'
import { useSelector, useDispatch } from 'react-redux';
import {
    select,
    rightSetActive,
    getOrders
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

export default function RightSidebar() {
    const [addActivated, setAddActivated] = useState(true)
    const [mystores, setStores] = useState([])
    const [addStore, setAddStore] = useState({})

    const stores = useSelector(state => state.stores)
    const main = useSelector(state => state.main)
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation()


    const getOrdersInit = (store) => {
        dispatch(getOrders(store))
    }




    const getStores = async () => {
        let response = await fetch(`http://127.0.0.1:80/falc0n/store/stores/${main.User.id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        setStores(result)
        let yes = false
        for (let key in stores.selectedStore.products) {
            if (stores.selectedStore.products.hasOwnProperty(key)) {
                yes = true
                break;
            }
        }
        console.log(yes);
        if (!yes && result[0]?.id) {
            getOrdersInit(result[0])
        }
    }

    const connect = async () => {
        let owner = main.User?.id
        let newStore = {
            store_name: addStore.name,
            url: addStore.url,
            owner
        }
        console.log(newStore);

        let response = await fetch('http://127.0.0.1:80/falc0n/store/add', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newStore)
        })
        let result = await response.json()
        response = await fetch(`http://127.0.0.1:80/falc0n/store/connect/${result.id}`, {
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
                        <img src={main.User?.image}
                            alt="profile" />
                    </div>
                    <p class="profile-text">YOUSSEF EL BAKKOURI</p>
                    <p class="profile-subtext">ADMIN</p>
                </div>
                <div class="app-right-content">
                    <div class="app-right-section">
                        <div class="app-right-section-header">

                            <span className="my-stores-button" onClick={() => setAddActivated(true)}><h2>MY STORES</h2></span>
                            <span class="notification-active" onClick={() => setAddActivated(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </span>
                        </div>
                        <div className="current-stores">
                            {
                                addActivated
                                    ? mystores.map(store => (
                                        <StoreButton getOrders={() => getOrdersInit(store)} store={store} key={store.id} />
                                    ))
                                    :
                                    <div className="link-store-form">
                                        <small>LINK NEW STORE :</small>
                                        <TextField fullWidth InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="NAME" variant="filled" onChange={(e) => setAddStore({ ...addStore, name: e.target.value })} />
                                        <TextField fullWidth InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="URL" variant="filled" onChange={(e) => setAddStore({ ...addStore, url: e.target.value })} />
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

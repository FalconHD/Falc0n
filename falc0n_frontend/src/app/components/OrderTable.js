import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStoreReports,
} from '../views/stores/storesSlice';
import { useFetch } from '../Hooks/useFetch'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const status = [
    'on-hold',
    'processing',
    'cancelled',
    'completed',
    'refunded',
    'pending'
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
        primary: {
            color: '#0c1635'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#e9780e',
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const { get, post } = useFetch

const SelectedButtons = ({ currOrder, changeStatus, id }) => {


    const showed = status.filter(statu => {
        return statu != currOrder.status
    })

    return (
        <ButtonGroup variant="contained" aria-label="contained primary button group">
            {showed.map(statu => (<Button key={statu} onClick={() => changeStatus(currOrder.id, statu)} style={{ backgroundColor: "#0c1635", color: "white" }} >{statu}</Button>))}
        </ButtonGroup>
    )
}

export default function DataTable({ getYearlyReports, getMonthlyReports }) {

    const [ordersData, setOrdersData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [currOrder, setCurrOrder] = useState({})
    const classes = useStyles();
    const stores = useSelector(state => state.stores)
    const dispatch = useDispatch()

    const handleOpen = (order) => {
        setCurrOrder(order)
        setOpen(true);
    };

    const changeStatus = async (order_id, status) => {
        let body = {
            order_id,
            status
        }
        console.log(body);
        let token = localStorage.getItem('Token')
        let id = stores.selectedStore.store.id
        let a = await post(`store/OrderStatus/${id}`, body, token)
        let res = a.json()
        dispatch(getStoreReports())
        getYearlyReports()
        getMonthlyReports()
        getOrders(id).then(() => {
            setOpen(false);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getOrders = async (id) => {
        let result = await get(`store/getAllOrders/${id}`, localStorage.getItem('Token'))
        setOrdersData(result)
    }
    const getShortDatetime = (d) => {
        let date = new Date(d)
        let options = {
            timeZone: 'UTC',
            timeZoneName: 'short'
        }
        return (new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(date));
    }




    useEffect(() => {
        getOrders(stores.selectedStore.store.id)
        console.log(stores.selectedStore.store);
    }, [stores.selectedStore.store])


    return (

        <div>
            <section>
                <h4>ORDERS SAMMERY</h4>
                <div class="tbl-header">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product</th>
                                <th>Name</th>
                                <th>revenue</th>
                                <th>quantity</th>
                                <th>datetime</th>
                                <th>apply</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            {
                                ordersData.length > 0
                                    ?
                                    ordersData.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.line_items[0].name}</td>
                                            <td>{order.total}</td>
                                            <td>{order.status}</td>
                                            <td>{order.line_items[0].quantity}</td>
                                            <td>{getShortDatetime(order.date_created)}</td>
                                            <td className="order-activity">
                                                <svg onClick={() => handleOpen(order)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" class="feather feather-eye">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                                                    </path>
                                                    <circle cx="12" cy="12" r="3">
                                                    </circle>
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
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">change status :</h2>
                            <div id="transition-modal-description" className={classes.root}>
                                <ButtonGroup variant="contained" aria-label="contained  button group">
                                    <SelectedButtons currOrder={currOrder} id={stores.selectedStore.store.id} changeStatus={changeStatus} />
                                </ButtonGroup>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>



    );
}

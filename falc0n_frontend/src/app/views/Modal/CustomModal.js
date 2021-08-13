import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    selectCustomer,
    customerDelete
} from '../customers/customersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { activateModal } from './modalSlice';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { deleteProduct, editProduct } from '../stores/storesSlice';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Upload from '../../components/Upload';



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
        primary: {
            color: '#0c1635'
        },

    },
    modalStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",

    },
    paper: {
        backgroundColor: 'rgba(231, 119, 13, 0.95)',
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    paper2: {
        backgroundColor: 'rgba(231, 119, 13, 0.95)',
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '40%',
        minWidth: "300px"

    },
    button: {
        margin: theme.spacing(1),
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
            backgroundColor: 'white',
            boxShadow: 'none',
        },
    }
}));



const methods = {
    "customer": customerDelete,
    "product": deleteProduct
}


const CustomModal = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedCustomerData, setSelectedCustomerSata] = useState({})
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState('')
    const [Stock, setStock] = useState('')
    const [imageProduct, setImageProduct] = useState(null)
    const customers = useSelector(state => state.customers)
    const modalStore = useSelector(state => state.Modal)
    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        console.log(modalStore.status);
        setOpen(modalStore.status);
    }, [modalStore.status])

    const handleClose = () => {
        setOpen(false);
        dispatch(activateModal(false))
    };

    const startDelete = () => {
        // dispatch(customerDelete(selectedCustomerData.infos.id))
        dispatch(methods[selectedCustomerData.infos.target](selectedCustomerData.infos.id))
        handleClose()
    }

    useEffect(() => {
        if (modalStore.data.target == "product") {
            console.log('product target ');
            setName(modalStore.data?.product?.name)
            setPrice(modalStore.data?.product?.price)
            setStock(modalStore.data?.product?.stock_status)
        } else {
            setSelectedCustomerSata(modalStore.data)
        }
    }, [modalStore.data]);


    useEffect(() => {
        console.log(imageProduct);
    }, [imageProduct])

    const startEditingProduct = () => {
        let infos = {
            name: Name,
            price: Price,
            stock: Stock
        }
        console.log(infos);
        // let data = new FormData();
        // data.append('file', imageProduct);
        // data.append('data', infos);
        // dispatch(editProduct({ data, id: selectedCustomerData.product.id }))
    }


    return (
        <div>
            {modalStore.action != "edit" ?
                < Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modalStyle}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} >
                        <div className={classes.paper}>

                            <h5 id="transition-modal-title">DELETING CUSTOMER :</h5>
                            <div id="transition-modal-description" className={classes.root}>
                                <small>{selectedCustomerData?.infos?.message}  {selectedCustomerData.infos?.id}</small>
                                <div style={{ display: "flex", gap: '20px' }}>
                                    <Button onClick={() => handleClose()} style={{ backgroundColor: '#0c1635', color: 'white' }} variant="contained" disableElevation>
                                        <svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="15" y1="9" x2="9" y2="15"></line>
                                            <line x1="9" y1="9" x2="15" y2="15"></line>
                                        </svg>
                                        CANCEL
                                    </Button>
                                    <Button onClick={() => startDelete()} style={{ backgroundColor: '#0c1635', color: 'white' }} variant="contained" color="primary" disableElevation>
                                        <svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        DELETE
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                : < Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modalStyle}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} >
                        <div className={classes.paper2}>
                            <div style={{ width:'100%' }}>
                                <h5 id="transition-modal-title">{selectedCustomerData.message} {selectedCustomerData?.product?.id}</h5>
                                <div id="transition-modal-description" className={classes.root}>
                                    <div className="link-store-form">
                                        <TextField fullWidth InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="NAME" variant="filled" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                        <TextField fullWidth InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="filled-basic" label="PRICE" variant="filled" value={Price} onChange={(e) => { setPrice(e.target.value) }} />
                                        <FormControl fullWidth variant="filled" className={classes.input}>
                                            <InputLabel className={classes.label} style={{ color: '#dd8108', fontSize: "13px" }} id="demo-simple-select-filled-label">STOCK</InputLabel>
                                            <Select

                                                className={classes.input}
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={Stock}
                                                onChange={(e) => { setStock(e.target.value) }}
                                            >
                                                
                                            
                                                <MenuItem style={{ color: '#151c32' }} value={Stock == "instock" ? Stock : 'inStock'}>inStock</MenuItem>
                                                <MenuItem style={{ color: '#151c32' }} value={Stock == "outofstock" ? Stock : 'outofstock'}>ouOfStock</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Upload setImageProduct={setImageProduct} style={{ width: "100%" }} />
                                        <Button onClick={() => startEditingProduct()} fullWidth variant="contained" color="primary" href="#contained-buttons" className={classes.button} style={{ backgroundColor: '#0c1635', color: 'white' }} >
                                            UPDATE
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            }

        </div >
    )
}

export default CustomModal

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Error = () => {
    const [error, setError] = useState({
        message: "",
        status: "",
        show: false
    })

    const errorStore = useSelector(state => state.error)
    const dispatch = useDispatch()
    useEffect(() => {
        errorStore.active ? setError({
            ...error,
            message: errorStore.message,
            status: errorStore.status,
            show: true
        }) : setError({
            ...error,
            message: "",
            status: "",
            show: false
        })
    }, [errorStore.active])

    return (
        <div style={{position:"absolute" , width:"100%",display:"flex",justifyContent:"center",top:"30px"}}>
            {error.show && <Alert severity="success">{error.status + " " + `${error.message}`.toUpperCase()}</Alert>}
        </div>
    );
}

export default Error;

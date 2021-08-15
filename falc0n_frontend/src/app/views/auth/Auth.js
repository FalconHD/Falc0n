import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login'
import Register from '../../components/Register'


const Auth = () => {


    const [login, setLogin] = useState(true)
    const [logged, setlogged] = useState(false)
    const main = useSelector(state => state.main)



    useEffect(() => {
        if (main.Authorized) {
            setlogged(true)
        }
    }, [main.Authorized])

    return (
        <>
            {logged ?
                <Redirect to='/' /> :
                login ?
                    <Login setLogin={setLogin} />
                    : <Register setLogin={setLogin} />
            }
        </>
    );
}

export default Auth;

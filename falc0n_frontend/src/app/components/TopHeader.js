import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'

import {
    setActive,
    updateName
} from '../views/sidebar/sidebarSlice';

export default function TopHeader() {

    const [title, setTitle] = useState("")
    const location = useLocation()
    const sidebar = useSelector((state) => state.sidebar)
    const dispatch = useDispatch();
    const sidebarMove = () => {
        dispatch(setActive(true))
    }
    const pages = {
        "stores": "STORES",
        "posts": "POSTS",
        "profil": "PROFIL",
        "salses": "SALSES"
    }
    useEffect(() => {
        console.log(location.pathname.split('/')[1]);
        if (location.pathname != '/') {
            setTitle(location.pathname.split('/').length > 0 && pages[`${location.pathname.split('/')[1]}`]);
        } else {
            setTitle("DASHBOARD");
        }
    }, [location.pathname]);

    return (
        <>
            <div className="main-header-line">
                <h1>{title}</h1>
                <div className="action-buttons">
                    <button className="open-right-area">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-activity">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </button>
                    <button className="menu-button" onClick={() => sidebarMove()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-menu">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

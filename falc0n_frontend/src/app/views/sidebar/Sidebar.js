import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'

import {
    Link
} from "react-router-dom";
import {
    sidebarState,
    updateName,
    setActive
} from './sidebarSlice';

export function Sidebar() {

    const sidebar = useSelector(state => state.sidebar)
    const dispatch = useDispatch();
    const location = useLocation()

    const [pages, setPages] = useState([
        "DASHBOARD",
        "STORES",
        "POSTS",
        "PROFIL",
        "SALES"
    ])

    const handleActive = (idx) => {
        console.log(idx);
        let links = [...document.querySelectorAll(".nav-list-item")]
        links.map(link => {
            link.classList.contains('active') && link.classList.remove('active')
        })
        links[idx - 1].classList.add('active')
        console.log(links[idx - 1]);
        dispatch(updateName(pages[idx - 1]))
        dispatch(setActive(false))
    }
    useEffect(() => {
        let idx = pages.indexOf(`${location.pathname.split('/').join('').toLocaleUpperCase()}`)
        console.log(idx);
        idx > 0 ? handleActive(idx + 1) : handleActive(1)
    }, []);

    useEffect(() => {
        sidebar.show.payload ? document.querySelector('.app-left').classList.add('show') : document.querySelector('.app-left').classList.remove('show')
    }, [sidebar.show]);




    return (
        <div className="app-left">
            <button className="close-menu" onClick={() => dispatch(setActive(false))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
            <div className="app-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-bar-chart-2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span><h2> Falc0n </h2></span>
            </div>
            <ul className="nav-list">
                <li onClick={() => { handleActive(1) }} className="nav-list-item active">
                    <Link to="/">
                        <a className="nav-list-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-columns">
                                <path
                                    d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
                            </svg>
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li onClick={() => { handleActive(2) }} className="nav-list-item">
                    <Link to="/stores">
                        <a className="nav-list-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-briefcase">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            My Stores
                        </a>
                    </Link>
                </li>
                <li onClick={() => { handleActive(3) }} className="nav-list-item">
                    <Link to="/posts">
                        <a className="nav-list-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-file">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                <polyline points="13 2 13 9 20 9" />
                            </svg>
                            Posts
                        </a>
                    </Link>
                </li>
                <li onClick={() => { handleActive(4) }} className="nav-list-item">
                    <Link to="/profil">
                        <a className="nav-list-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-users">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Profil
                        </a>
                    </Link>
                </li>
                <li onClick={() => { handleActive(5) }} className="nav-list-item">
                    <Link to="/sales">
                        <a className="nav-list-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-pie-chart">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                <path d="M22 12A10 10 0 0 0 12 2v10z" />
                            </svg>
                            SALES
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


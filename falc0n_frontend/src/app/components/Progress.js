import React, { useEffect, useState } from 'react'
import { useFetch } from '../Hooks/useFetch'

import GetStoreReports from './GetStoreReports'

const { get, post, postWithUpload } = useFetch



export function Progress({ stores }) {
    const [all, setAll] = useState([])
    const [statics, setStatiscs] = useState([])
    const [colors, setColors] = useState([])

    const getColor = (id) => {
        console.log(Math.floor(Math.random() * 16777215).toString(16), id);
        let color = Math.floor(Math.random() * 16777215).toString(16)
        // setColors([...colors,{id:id,color:color}])
        return {
            'background-color': `#${color}`
        }
    }


    useEffect(() => {
        setStatiscs(stores)
    }, [stores])


    return (
        <div className="chart-container">
            <div className="chart-container-header">
                <h2>SALES BY STORE </h2>
                <span href="#">This month</span>
            </div>
            <div className="salse-bar">
                <span className="bar-progress rejected" style={{ width: "8%" }}></span>
                <span className="bar-progress on-hold" style={{ width: "10%" }}></span>
                <span className="bar-progress shortlisted" style={{ width: "18%" }}></span>
                <span className="bar-progress applications" style={{ width: "64%" }}></span>
            </div>
            {
                stores.map(store => (
                    <div className="progress-bar-info">
                        <span className="progress-color " style={getColor(store.id)}></span>
                        <span className="progress-type">{`${store?.store_name}`.toLocaleUpperCase()}</span>
                        <span className="progress-amount" ><GetStoreReports store={store} /></span>
                    </div>
                )
                )
            }

        </div>
    )
}

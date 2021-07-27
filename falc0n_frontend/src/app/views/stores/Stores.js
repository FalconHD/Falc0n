import React, { useEffect, useState } from 'react'
import TopHeader from '../../components/TopHeader'

export function Stores() {
    const [stores, setStores] = useState([])
    const [orders, setOrders] = useState([])
    const getOrders = async (id) => {
        let response = await fetch(`http://localhost/falc0n/store/getProducts/${id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
        let result = await response.json()
        setOrders(result)
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
    }


    // var url = new URL(location.href);
    // console.log(url);
    // var params = url.searchParams.get("success");
    // var id = url.searchParams.get("user_id");;
    // console.log(params);
    // if (params) {
    //     getStores()
    // }

    useEffect(() => {
        getStores()
    }, []);
    return (
        <div className="app-main">
            <TopHeader />
            <div className="chart-container" style={{ color: 'white', display: 'flex', flexWrap:"wrap",justifyContent:"center",gap:"10px" }}>
                {
                    stores.map(store => (
                        <button style={{ width: "300px", padding: "20px" }} onClick={() => getOrders(store.id)}>{store.url}</button>
                    ))
                }
                {orders.length > 0
                    ?
                    orders.map(order => (
                        <div>
                            <img src={order.images[0].src} style={{width:"300px",height:"300px"}} />
                            <h3>{order.name}</h3>
                        </div>
                    ))
                    : <h5>waiting for products</h5>
                }
            </div>
        </div>
    )
}

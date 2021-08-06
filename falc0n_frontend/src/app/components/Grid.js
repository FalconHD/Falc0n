import React, { useEffect, useRef, useState } from 'react';

import ResponsiveGridLayout from 'react-grid-layout';

const Grid = () => {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
        { i: 'a', x: 0, y: 0, w: 0, h: 0 },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];



    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const myRef = useRef(null)
    useEffect(() => {
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }


    }, [myRef])

    useEffect(() => {
        console.log(width, height);
    }, [width, height])

    return (

        <ResponsiveGridLayout ref={myRef} className="layout" layouts={layout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
            <div style={{ color: "white", border: "solid 1px white", padding: "30px" }} key="1">1</div>
            <div style={{ color: "white", border: "solid 1px white", padding: "30px" }} key="2">2</div>
            <div style={{ color: "white", border: "solid 1px white", padding: "30px" }} key="3">3</div>
        </ResponsiveGridLayout>
    )
}

export default Grid;

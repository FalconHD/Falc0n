import React from 'react'

export function Persentager(props) {

    return (
        <div className="chart-container-wrapper">
            <div className="chart-container">
                <div className="chart-info-wrapper">
                    <h2>{props.title}</h2>
                    <span>{props.revenue} K</span>
                </div>
                <div className="chart-svg">
                    <svg viewBox="0 0 36 36" className={`circular-chart ${props.color}`}>
                        <path className="circle-bg" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" strokeDasharray={`${props.persentage}, 100`} d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{props.persentage}%</text>
                    </svg>
                </div>
            </div>
        </div>
    )
}


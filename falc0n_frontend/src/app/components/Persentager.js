import React from 'react'

const Persentager = ({ title = 'clalcu...', revenue = 0, persentage = 0, color = 'white', type }) => {
    return (
        <div className="chart-container-wrapper">
            <div className="chart-container">
                <div className="chart-info-wrapper">
                    <h2>{title}</h2>
                    <span>{revenue} </span>
                    <small className="chart-type-dispayed">{type}</small>
                </div>
                <div className="chart-svg">
                    <svg viewBox="0 0 36 36" className={`circular-chart ${color}`}>
                        <path className="circle-bg" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path className="circle" strokeDasharray={`${persentage}, 100`} d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" className="percentage">{persentage}%</text>
                    </svg>
                </div>
            </div>
        </div>
    )
}


export default Persentager;


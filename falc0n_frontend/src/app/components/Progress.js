import React from 'react'

export function Progress() {
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
            <div className="progress-bar-info">
                <span className="progress-color applications"></span>
                <span className="progress-type">WALID</span>
                <span className="progress-amount">64%</span>
            </div>
            <div className="progress-bar-info">
                <span className="progress-color shortlisted"></span>
                <span className="progress-type">YUSUF</span>
                <span className="progress-amount">18%</span>
            </div>
            <div className="progress-bar-info">
                <span className="progress-color on-hold"></span>
                <span className="progress-type">FALC0N</span>
                <span className="progress-amount">10%</span>
            </div>
            <div className="progress-bar-info">
                <span className="progress-color rejected"></span>
                <span className="progress-type">UNESS</span>
                <span className="progress-amount">8%</span>
            </div>
        </div>
    )
}

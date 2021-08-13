import React from 'react';

const RecentOrders = () => {
    return (
        <div className="chart-container applicants">
            <div className="chart-container-header">
                <h2>RECENT SALES</h2>
                <span>Today</span>
            </div>
            <div className="applicant-line">
                <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="profile" />
                <div className="applicant-info">
                    <span>Emma Ray</span>
                    <p>5 piece of Nice Book Genders <strong>Product Designer</strong></p>
                </div>
            </div>
        </div>
    );
}

export default RecentOrders;

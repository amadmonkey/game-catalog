import React from 'react';
import './DashboardContainer.scss';

const DashboardContainer = (props) => {
    return (
        <div className="dashboard-container">
            <h1 className="title">{props.title}</h1>
            {props.children}
        </div>
    )
}

export default DashboardContainer

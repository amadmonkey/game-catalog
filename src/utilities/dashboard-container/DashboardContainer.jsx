import React from 'react';
import { Link } from "react-router-dom";
import './DashboardContainer.scss';

const DashboardContainer = (props) => {
    return (
        <div className="dashboard-container">
            <Link to={`${props.title.link}`}><h1 className="container-title">{props.title.name}</h1></Link>
            {props.children}
        </div>
    )
}

export default DashboardContainer

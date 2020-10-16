import React from 'react';

import './Pagination.scss';

const Pagination = (props) => {
    return (
        <div className="pagination-container">
            <nav className="pagination">
                <ul>
                    <li className="symbol"><a><button>&lt;</button></a></li>
                    <li className="number first"><a><button onClick={props.dataFunction(1)}>1</button></a></li>
                    <li className="number active"><a><button onClick={props.dataFunction(1)}>2</button></a></li>
                    <li className="number"><a><button onClick={props.dataFunction(1)}>3</button></a></li>
                    <li className="number"><a><button onClick={props.dataFunction(1)}>4</button></a></li>
                    <li className="number last"><a><button onClick={props.dataFunction(1)}>5</button></a></li>
                    <li className="symbol"><a><button>&gt;</button></a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination

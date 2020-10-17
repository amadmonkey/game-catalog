// app
import React, { useState } from 'react';

// styles
import './Container.scss';

const Container = (props) => {

    const [searchValue, setSearchValue] = useState('');
    const [isFormActive, setIsFormActive] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.handleSearch(searchValue);
    }

    const handleToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="container">
            {
                !props.isDashboard &&
                <div>
                    <div className="filters">
                        <h1 className="container-title">{props.title}</h1>
                        <span className="search">
                            <form id="_SEARCH-FORM" className={isFormActive || searchValue ? 'active' : ''} onSubmit={(e) => handleFormSubmit(e)}>
                                <div>
                                    <label hidden>Search</label>
                                    <input type="text" id="_SEARCH" className={isFormActive || searchValue ? 'active' : ''} placeholder="Search" value={searchValue} onFocus={(e) => setIsFormActive(true)} onBlur={(e) => setIsFormActive(false)} onChange={(e) => setSearchValue(e.target.value)} />
                                </div>
                                <button className={`clear-button ${searchValue ? 'active' : ''}`} type="button" onClick={() => setSearchValue('')}>&times;</button>
                                <button className={`submit-button ${isFormActive ? 'active' : ''}`} type="submit">&gt;</button>
                            </form>
                        </span>
                    </div>
                </div>
            }
            {props.children}
            {
                !props.isDashboard &&
                <div className="container-footer">
                    <button className={`show-more ${props.isLoading ? 'loading' : ''}`} onClick={!props.isLoading ? props.handleShowMore : undefined}>{props.isLoading ? <div className="loading-icon">&nbsp;</div> : <div>...</div>}</button>
                    <button className="back-to-top" onClick={handleToTop}>^</button>
                </div>
            }
        </div>
    )
}

export default Container

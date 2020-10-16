import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../img/logo2.svg';
import './Header.scss';

import API from '../../constants/API.js';

const Header = (props) => {
    const [platforms, setPlatforms] = useState(null);
    const [genres, setGenres] = useState(null);
    const [publishers, setPublishers] = useState(null);

    useEffect(() => {

        API.GET.PLATFORMS().then(res => {
            setPlatforms(res.data.results.splice(0, 10));
        })

        API.GET.GENRES().then(res => {
            setGenres(res.data.results);
        })

        API.GET.PUBLISHERS().then(res => {
            setPublishers(res.data.results);
        })

    }, [])

    return (
        <header className="main-header">
            <div className="logo">
                <Link to="/"><Logo /></Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/games">Games</Link>
                    </li>
                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                    <li>
                        <Link to="/reviews">Reviews</Link>
                    </li>
                    <li>
                        <span>Browse</span>
                        <div className="dropdown">
                            <div style={{ display: "flex", width: "700px" }}>
                                {
                                    platforms &&
                                    <div>
                                        <h1>Platforms</h1>
                                        <ul>
                                            {platforms.map((obj, i) => {
                                                return <li key={i}><Link>{obj.name}</Link></li>
                                            })}
                                            <li className="see-all"><Link to="/menu-list/platforms">See all</Link></li>
                                        </ul>
                                    </div>
                                }
                                {
                                    genres &&
                                    <div>
                                        <h1>Genres</h1>
                                        <ul>
                                            {genres.map((obj, i) => {
                                                return <li key={i}><Link>{obj.name}</Link></li>
                                            })}
                                            <li className="see-all"><Link to="/menu-list/genres">See all</Link></li>
                                        </ul>
                                    </div>
                                }
                                {
                                    publishers &&
                                    <div>
                                        <h1>Publishers</h1>
                                        <ul>
                                            {publishers.map((obj, i) => {
                                                return <li key={i}><Link>{obj.name}</Link></li>
                                            })}
                                            <li className="see-all"><Link to="/menu-list/publishers">See all</Link></li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default Header


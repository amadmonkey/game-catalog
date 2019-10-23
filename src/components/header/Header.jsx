import React from 'react';
import { ReactComponent as Logo } from '../../img/logo2.svg';
import './Header.scss';

const Header = (props) => {
    return (
        <header className="main-header">
            <div className="logo">
                <Logo />
            </div>
            <div className="mobile-menu">
                <span className="menu-bars"></span>
                <nav>
                </nav>
            </div>
            <nav>
                <ul>
                    <li>
                        <a>Platforms</a>
                        <div className="dropdown">
                            <ul>
                                <li><a>PC</a></li>
                                <li><a>Xbox One</a></li>
                                <li><a>PlayStation 4</a></li>
                                <li><a>Nintendo Switch</a></li>
                                <li><a>Macintosh</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a>Genre</a>
                        <div className="dropdown">
                            <ul>
                                <li><a>PC</a></li>
                                <li><a>Xbox One</a></li>
                                <li><a>PlayStation 4</a></li>
                                <li><a>Nintendo Switch</a></li>
                                <li><a>Macintosh</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a>Publishers</a>
                        <div className="dropdown">
                            <ul>
                                <li><a>PC</a></li>
                                <li><a>Xbox One</a></li>
                                <li><a>PlayStation 4</a></li>
                                <li><a>Nintendo Switch</a></li>
                                <li><a>Macintosh</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a>Others</a>
                        <div className="dropdown">
                            <ul>
                                <li><a>PC</a></li>
                                <li><a>Xbox One</a></li>
                                <li><a>PlayStation 4</a></li>
                                <li><a>Nintendo Switch</a></li>
                                <li><a>Macintosh</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
            <span className="search">
                <div>
                    <input type="text" id="_SEARCH" placeholder="Search" />
                </div>
            </span>
        </header>
    )
}

export default Header


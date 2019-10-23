import React from 'react';
import { ReactComponent as Gamespot } from '../../img/help-gamespot.svg';
import { ReactComponent as Rawg } from '../../img/help-rawg.svg';
import './Footer.scss';

const Footer = () => {

    var d = new Date();

    return (
        <footer className="main-footer">
            <div className="text">
                <div>
                    <Gamespot />
                    <Rawg style={{ width: '128px' }} />
                </div>
                <span className="copyright">© {d.getFullYear()} All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer

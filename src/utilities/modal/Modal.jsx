// app
import React from 'react';
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext";
import Moment from 'react-moment';
import 'moment-timezone';

// components
import { ReactComponent as Time } from '../../img/time.svg';

// styles
import './Modal.scss';

const Modal = () => {
    let { modalContent, handleModal, modal } = React.useContext(ModalContext);
    return modal ? ReactDOM.createPortal(
        <div className={`modal-container ${modalContent ? 'active' : ''}`} onClick={() => handleModal(null)}>
            <button className="modal-close" onClick={() => handleModal(null)} >&times;</button>
            <div className="modal content">
                <header>
                    <img loading="lazy" src={modalContent.image.original} alt={modalContent.title} />
                    <h1 className="title">{modalContent && modalContent.title}</h1>
                    <h2 className="authors">By {modalContent && modalContent.authors}</h2>
                    <div className="date">
                        <Time />
                        <Moment tz="America/Los_Angeles" fromNow>{modalContent && modalContent.publish_date}</Moment>
                    </div>
                </header>
                <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent && modalContent.body }}></div>
            </div>
            <footer>
                <span className="to-gamespot">Click <a target="_blank" rel="noopener noreferrer" href={modalContent && modalContent.site_detail_url}>here</a> to view original article</span>
            </footer>
        </div>,
        document.querySelector("#modal-root")
    ) : ""
}

export default Modal

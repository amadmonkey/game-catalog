import React from "react";

export default () => {
    let [modal, setModal] = React.useState(false);
    let [modalContent, setModalContent] = React.useState(null);

    let handleModal = (content = false) => {
        document.getElementsByTagName("html")[0].style.overflowY = (content ? 'hidden' : 'auto');
        document.getElementsByClassName("main-header")[0].style.zIndex = (content ? 2 : 3);

        setModal(!modal);
        if (content) {
            setModalContent(content);
        }
    };

    return { modal, handleModal, modalContent };
};

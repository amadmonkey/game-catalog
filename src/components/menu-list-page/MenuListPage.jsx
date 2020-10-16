// app
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// data 
import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

// styles
import './MenuListPage.scss';

const MenuListPage = (props) => {

    let type = props.match.params.type;
    const [list, setList] = useState(null);

    const getPlatforms = () => {
        API.GET.PLATFORMS({
            page_limit: 60,
            ordering: "name"
        }).then(res => {
            console.info('->>', res.data.results);
            setList(res.isAxiosError ? BACKUP.PLATFORMS : res.data.results);
        })
    }

    const getGenres = () => {
        API.GET.GENRES({
            page_limit: 60,
            ordering: "name"
        }).then(res => {
            console.info('->>', res.data.results);
            setList(res.isAxiosError ? "" : res.data.results);
        })
    }

    const getPublishers = () => {
        API.GET.PUBLISHERS({
            page_limit: 60,
            ordering: "name"
        }).then(res => {
            console.info('->>', res.data.results);
            setList(res.isAxiosError ? "" : res.data.results);
        })
    }

    const generateCharacterList = () => {

        let sectionElements = [];

        // manage special characters
        let specialCharacterItems = [];
        for (let x = 0; x < list.length; x++) {
            if (!isNaN(list[x].name.charAt(0)))
                specialCharacterItems.push(React.createElement("li", { key: x }, <Link to="">{list[x].name}</Link>))
            else
                break;
        }

        // create ultimate list and append the special characters section
        specialCharacterItems.length && sectionElements.push(React.createElement("li", { className: "character-section", key: "0" }, ["*", React.createElement("ul", { className: "character-items-container" }, specialCharacterItems)]));

        // manage alphabets
        for (let x = 65; x <= 90; x++) {
            let currentChar = String.fromCharCode(x);
            let sectionElementItems = [];
            for (let x = 0; x < list.length; x++) {
                if (list[x].name.charAt(0) === currentChar)
                    sectionElementItems.push(React.createElement("li", { key: x }, <Link>{list[x].name}</Link>))
            }
            sectionElementItems.length && sectionElements.push(React.createElement("li", { className: "character-section", key: x }, [currentChar, React.createElement("ul", { className: "character-items-container" }, sectionElementItems)]));
        }

        return sectionElements;
    }

    useEffect(() => {
        setList(null);
        switch (type.toUpperCase()) {
            case "PLATFORMS":
                getPlatforms();
                break;
            case "GENRES":
                getGenres();
                break;
            case "PUBLISHERS":
                getPublishers();
                break;
            default:
                break;
        }
    }, [type]);

    return list ? (
        <div className="menu-list" style={{ color: "#fff" }}>
            <h1 className="title">List of {props.match.params.type.toUpperCase()}</h1>
            <ul className="character-list">
                {generateCharacterList()}
            </ul>
            {/* <pre>{JSON.stringify(list, null, 5)}</pre> */}
        </div>
    ) : "Loading..."
}

export default MenuListPage

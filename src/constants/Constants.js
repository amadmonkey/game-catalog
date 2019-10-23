import React from 'react';
import { ReactComponent as PlayStation } from '../img/platform-ps.svg';
import { ReactComponent as Xbox } from '../img/platform-xbox.svg';
import { ReactComponent as Windows } from '../img/platform-windows.svg';
import { ReactComponent as Mac } from '../img/platform-mac.svg';
import { ReactComponent as Switch } from '../img/platform-switch.svg';
import { ReactComponent as Steam } from '../img/platform-steam.svg';
import { ReactComponent as Ios } from '../img/platform-ios.svg';

const getUnique = (arr, comp) => {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
    return unique;
}

const getStores = (array) => {
    if (array) {
        array = getUnique(array, array.store ? 'name' : 'platform');
        return array.map((obj, i) => {
            let slug = (typeof obj.platform === 'object') ? obj.platform.name : obj.platform;
            switch (slug.toUpperCase()) {
                case 'NINTENDO SWITCH':
                    return <li key={i}><Switch /></li>;
                case 'PC':
                    return <li key={i}><Windows /></li>;
                case 'MACINTOSH':
                    return <li key={i}><Mac /></li>;
                case 'XBOX ONE':
                    return <li key={i}><Xbox /></li>;
                case 'PLAYSTATION 4':
                case 'PLAYSTATION STORE':
                    return <li key={i}><PlayStation /></li>;
                case 'STEAM':
                    return <li key={i}><Steam /></li>;
                case 'IOS (IPHONE/IPAD)':
                    return <li key={i}><Ios /></li>;
                default:
                    return '';
            }
        })
    } else {
        return '';
    }
}

const ICON = {
    GET_STORES: getStores
}

export default ICON;
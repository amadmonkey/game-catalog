import React from 'react';

// platforms
import { ReactComponent as PlayStation } from '../img/platforms/platform-ps.svg';
import { ReactComponent as PlayStation2 } from '../img/platforms/platform-playstation2.svg';
import { ReactComponent as PlayStation3 } from '../img/platforms/platform-playstation3.svg';
import { ReactComponent as PlayStation4 } from '../img/platforms/platform-playstation4.svg';
import { ReactComponent as PlayStationVita } from '../img/platforms/platform-playstationvita.svg';
import { ReactComponent as Xbox } from '../img/platforms/platform-xbox.svg';
import { ReactComponent as Windows } from '../img/platforms/platform-windows.svg';
import { ReactComponent as Mac } from '../img/platforms/platform-mac.svg';
import { ReactComponent as Switch } from '../img/platforms/platform-switch.svg';
import { ReactComponent as Ios } from '../img/platforms/platform-ios.svg';
import { ReactComponent as Android } from '../img/platforms/platform-android.svg';
import { ReactComponent as Linux } from '../img/platforms/platform-linux.svg';
import { ReactComponent as Atari } from '../img/platforms/platform-atari.svg';
import { ReactComponent as Sega } from '../img/platforms/platform-sega.svg';
import { ReactComponent as Nintendo } from '../img/platforms/platform-nintendo.svg';
import { ReactComponent as Nintendo3ds } from '../img/platforms/platform-nintendo3ds.svg';
import { ReactComponent as NintendoGamecube } from '../img/platforms/platform-nintendogamecube.svg';
import { ReactComponent as NintendoSwitch } from '../img/platforms/platform-nintendoswitch.svg';

// stores
import { ReactComponent as Steam } from '../img/stores/store-steam.svg';
import { ReactComponent as Epic } from '../img/stores/store-epicgames.svg';
import { ReactComponent as AppStore } from '../img/stores/store-appstore.svg';
import { ReactComponent as Gog } from '../img/stores/store-gog-dot-com.svg';
import { ReactComponent as Itch } from '../img/stores/store-itch-dot-io.svg';
import { ReactComponent as GooglePlay } from '../img/stores/store-googleplay.svg';

const getUnique = (arr, comp) => {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
    return unique;
}

const getPlatforms = (array) => {
    if (array) {
        array = getUnique(array, array.store ? 'name' : 'platform');
        return array.map((obj, i) => {
            let slug = (typeof obj.platform === 'object') ? obj.platform.name : obj.platform ? obj.platform : obj.store.name;
            switch (slug.toUpperCase()) {
                case 'PC':
                    return <li key={i}><Windows /></li>;
                case 'PLAYSTATION':
                case 'PLAYSTATION 1':
                case 'PSP':
                    return <li key={i}><PlayStation /></li>;
                case 'PLAYSTATION 2':
                    return <li key={i}><PlayStation2 /></li>;
                case 'PLAYSTATION 3':
                    return <li key={i}><PlayStation3 /></li>;
                case 'PLAYSTATION 4':
                    return <li key={i}><PlayStation4 /></li>;
                case 'PLAYSTATION 5':
                    return <li key={i}><PlayStation /></li>;
                case 'PLAYSTATION VITA':
                    return <li key={i}><PlayStation /></li>;
                case 'XBOX':
                case 'XBOX ONE':
                case 'XBOX 360':
                case 'XBOX SERIES S/X':
                    return <li key={i}><Xbox /></li>;
                case 'IOS':
                    return <li key={i}><Ios /></li>;
                case 'ANDROID':
                    return <li key={i}><Android /></li>;
                case 'MACOS':
                case 'CLASSIC MACINTOSH':
                case 'APPLE II':
                case 'APPLE MACINTOSH':
                    return <li key={i}><Mac /></li>;
                case 'WII':
                case 'NES':
                case 'SNES':
                case 'GAME BOY':
                case 'GAME BOY ADVANCE':
                case 'GAME BOY COLOR':
                case 'WII U':
                case 'NINTENDO':
                case 'NINTENDO 64':
                case 'NINTENDO DS':
                case 'NINTENDO DSI':
                    return <li key={i}><Nintendo /></li>;
                case 'NINTENDO 3DS':
                    return <li key={i}><Nintendo3ds /></li>;
                case 'NINTENDO SWITCH':
                    return <li key={i}><NintendoSwitch /></li>;
                case 'GAMECUBE':
                    return <li key={i}><NintendoGamecube /></li>;
                case 'LINUX':
                    return <li key={i}><Linux /></li>;
                case 'ATARI':
                    return <li key={i}><Atari /></li>;
                case 'SEGA':
                    return <li key={i}><Sega /></li>;
                default:
                    return '';
            }
        })
    } else {
        return '';
    }
}

const getStores = (array) => {
    if(array){
        return array.map((obj, i) => {
            let slug = obj.store.name;
            let item = ``
            switch (slug.toUpperCase()) {
                case 'GOG':
                    return <li key={i}><Gog /></li>;
                case 'STEAM':
                    return <li key={i}><Steam /></li>;
                case 'EPIC GAMES':
                    return <li key={i}><Epic /></li>;
                case 'XBOX STORE':
                case 'XBOX 360 STORE':
                    return <li key={i}><Xbox /></li>;
                case 'PLAYSTATION STORE':
                    return <li key={i}><PlayStation /></li>;
                case 'NINTENDO STORE':
                    return <li key={i}><Nintendo /></li>;
                case 'GOOGLE PLAY':
                    return <li key={i}><GooglePlay /></li>;
                case 'APP STORE':
                    return <li key={i}><AppStore /></li>;
                case 'ITCH.IO':
                    return <li key={i}><Itch /></li>;
                default:
                    return '';
            }
        })
    } else {
        return ''
    }
}

const ICON = {
    GET_STORES: getStores,
    GET_PLATFORMS: getPlatforms
}

export default ICON;
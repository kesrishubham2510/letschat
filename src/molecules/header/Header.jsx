import './header.css';

import { Fragment, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { UserContext } from '../../config/GlobalState';

import { DisplayHeader } from '../../utilities/DisplayHelper';

import LeftHeader from '../../atoms/leftHeader/LeftHeader';
import RightHeader from '../../atoms/rightHeader/RightHeader';

function Header() {

    const currentLocation = useLocation();

    if(DisplayHeader(currentLocation.pathname)){
        return <Fragment/>;
    }

    return <div className="header">
        <LeftHeader />
        <RightHeader />
    </div>
}

export default Header;
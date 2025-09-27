import './header.css';

import { Fragment, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { UserContext } from '../../config/GlobalState';

import LeftHeader from '../../atoms/leftHeader/LeftHeader';
import RightHeader from '../../atoms/rightHeader/RightHeader';

function Header() {

    const {userState} = useContext(UserContext);
    const currentLocation = useLocation();

    if(currentLocation.pathname.includes('/home') && userState.isLoggedIn){
        return <Fragment/>;
    }

    return <div className="header">
        <LeftHeader />
        <RightHeader />
    </div>
}

export default Header;
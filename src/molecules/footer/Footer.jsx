import { useContext, Fragment } from 'react';
import { UserContext } from '../../config/GlobalState';
import { useLocation } from 'react-router-dom';

import './footer.css';

function Footer() {

    const { userState } = useContext(UserContext);
    const currentLocation = useLocation();

    if (currentLocation.pathname.includes('/home') && userState.isLoggedIn) {
        return <Fragment />;
    }

    return <div className="footer">
        <p>Github</p>
        <p>Medium</p>
        <p>LinkedIn</p>
        <p>Instagram</p>
        <p>Leetcode</p>
    </div>
}

export default Footer;
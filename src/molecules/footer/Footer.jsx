import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import './footer.css';
import { DisplayFooter } from '../../utilities/DisplayHelper';

function Footer() {

    const currentLocation = useLocation();

    if (DisplayFooter(currentLocation.pathname)) {
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
import './header.css';

import LeftHeader from '../../atoms/leftHeader/LeftHeader';
import RightHeader from '../../atoms/rightHeader/RightHeader';

function Header() {
    return <div className="header">
        <LeftHeader />
        <RightHeader />
    </div>
}

export default Header;
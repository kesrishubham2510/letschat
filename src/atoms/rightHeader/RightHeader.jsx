import './rightHeader.css';

import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';

function RightHeader() {

    const navigate = useNavigate();

    const styleForLink = {
        fontWeight: '600',
        textDecoration: 'none'
    }

    return <div className='right-header'>
        <div className='nav-group'>
            <Link style={styleForLink} to='/'>Home</Link>
            <Link style={styleForLink} to='/'>About</Link>
            <Link style={styleForLink} to='/'>Features</Link>
            <Link style={styleForLink} to='/'>Contact</Link>
        </div>
        <div className='button-group'>
            <Button action={() => navigate('/register')} label="Signup" />
        </div>
    </div>;
}

export default RightHeader;
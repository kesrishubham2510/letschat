import './rightHeader.css';

import Button from '../button/Button';

function RightHeader() {

    const loginFunction = (event) => {
        console.log("Login button clicked");
    }

    const signupFunction = (event) => {
        console.log("Signup button clicked");
    }

    return <div className='right-header'>
        <text>Home</text>
        <text>About</text>
        <text>Features</text>
        <text>Contact</text>
        <div className='button-section'>
            <Button onClick={loginFunction} label="Login" />
            <Button onClick={signupFunction} label="Signup" />
        </div>
    </div>;
}

export default RightHeader;
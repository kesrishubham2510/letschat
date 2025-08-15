import { useState } from 'react';
import './signupForm.css';

import InputBox from '../../atoms/inputBox/InputBox';
import Button from '../../atoms/button/Button';

function SignupForm(props) {

    /*
        prop to customize the basic Button.jsx component,
        this is known as `Component Specialization`
    */

    const registerButtonStyle = {
        background: "whitesmoke",
        width: "100%",
        borderRadius: "10px",
        alignSelf: "center",
        marginTop: "5px",
        padding: "5px",
        fontWeight: "bold"
    }

    const loginButtonStyle = {
        background: "whitesmoke",
        width: "44%",
        borderRadius: "10px",
        padding: "5px"
    }

    // I'm using controlled components

    const [userData, setUserData] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    });

    function register() {
        console.log('registering with:- ' + userData);
    }

    return <div className="signupForm">
        <h1 className='page-label'>Registration</h1>
        <form onSubmit={register}>
            <InputBox id={"firstName"} type="text" value={userData.firstName} onChange={register} label={"First name"} placeHolder="John"></InputBox>
            <br />
            <InputBox id={"lastName"} type="text" value={userData.lastName} onChange={register} label={"Last name"} placeHolder="Doe"></InputBox>
            <br />
            <InputBox id={"email"} type="text" value={userData.email} onChange={register} label={"email"} placeHolder={"johndoe@example.com"}></InputBox>
            <br />
            <InputBox id={"password"} type="text" value={userData.password} onChange={register} label={"Password"} placeHolder={""}></InputBox>
            <br />
            <InputBox id={"confirmPassword"} value={userData.confirmPassword} onChange={register} label={"Confirm password"} placeHolder={""}></InputBox>
        </form>
        <div className='button-section'>
            <Button label={"Register"} style={registerButtonStyle} action={register} />
            <div className='alternate-section'>
                <text>Already have an account ?</text>
                <Button label={"Login"} style={loginButtonStyle} action={props.toggleForm} />
            </div>
        </div>
    </div>
}

export default SignupForm;
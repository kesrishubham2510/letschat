import { useState } from 'react';
import './signupForm.css';

import InputBox from '../../atoms/inputBox/InputBox';
import Button from '../../atoms/button/Button';

function SignupForm(props) {

    /*
        prop to customize the basic Button.jsx component,
        this is known as `Component Specialization`
    */

    const buttonStyle = {
        background: "whitesmoke",
        width: "70%",
        borderRadius: "10px",
        marginTop: "5px",
        height: "100%"
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
            <Button label={"Register"} style={buttonStyle} action={register}/>
            <Button label={"Login"} style={buttonStyle} action={props.toggleForm}/>
        </div>
    </div>
}

export default SignupForm;
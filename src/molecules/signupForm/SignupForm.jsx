import { useState } from 'react';
import './signupForm.css';

import InputBox from '../../atoms/inputBox/InputBox';
import Button from '../../atoms/button/Button';

function SignupForm(props) {

    /*
        prop to customize the basic Button.jsx component,
        this is known as `Component Specialization`
    */

    const loginButtonStyle = {
        background: "whitesmoke",
        width: "44%",
        borderRadius: "10px",
        padding: "5px"
    }

    const registerButtonStyle = { 
        ...loginButtonStyle,
        width: "100%",
        alignSelf: "center",
        marginTop: "5px",
        fontWeight: "bold"
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

    /*
        TODO:- Add some logic to show error that space is not allowed

    */

    function updateInput(event){
        const {name, value} = event.target;

        setUserData((prevState)=>{
            var updatedState = {
                ...prevState,
                // to avoid multiple words in first name
                [name] : value.trim()
            }

            return updatedState;
        });
    }

    return <div className="signupForm">
        <h1 className='page-label'>Registration</h1>
        <form onSubmit={register}>
            <InputBox id={"firstName"} name="firstName" type="p" value={userData.firstName} onChange={updateInput} label={"First name"} placeHolder="John"></InputBox>
            <br />
            <InputBox id={"lastName"} name="lastName" type="p" value={userData.lastName} onChange={updateInput} label={"Last name"} placeHolder="Doe"></InputBox>
            <br />
            <InputBox id={"email"}  name="email" type="p" value={userData.email} onChange={updateInput} label={"Email"} placeHolder={"johndoe@example.com"}></InputBox>
            <br />
            <InputBox id={"password"} name="password" type="p" value={userData.password} onChange={updateInput} label={"Password"} placeHolder={""}></InputBox>
            <br />
            <InputBox id={"confirmPassword"} name="confirmPassword" value={userData.confirmPassword} onChange={updateInput} label={"Confirm password"} placeHolder={""}></InputBox>
        </form>
        <div className='button-section'>
            <Button label={"Register"} style={registerButtonStyle} action={register} />
            <div className='alternate-section'>
                <p>Already have an account ?</p>
                <Button label={"Login"} style={loginButtonStyle} action={props.toggleForm} />
            </div>
        </div>
    </div>
}

export default SignupForm;
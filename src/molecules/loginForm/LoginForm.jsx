import { useState } from "react";

import './loginForm.css';
import DataHelper from "../../utilities/DataValidator";

import InputBox from "../../atoms/inputBox/InputBox";
import Button from "../../atoms/button/Button";


function LoginForm(props){

    const [userCredentials, setUserCredentials] = useState({
        'email': '',
        'password': ''
    });

    const [errors, setErrors] = useState({
        'emailErr': '',
        'passwordErr': ''
    })

     const registerButtonStyle = {
        background: "whitesmoke",
        width: "44%",
        borderRadius: "10px",
        padding: "5px"
    }

    const loginButtonStyle = {
        ...registerButtonStyle,
        width: "100%",
        alignSelf: "center",
        marginTop: "5px",
        fontWeight: "bold"
    }

    function updateInput(event){
        const {name, value} = event.target;

        setUserCredentials((prevCredentials)=>{
            return {
                ...prevCredentials,
                [name] : value
            }
        })
    }

    function login(event){
        event.preventDefault();
        console.log("User being logged in");
        validateCredentials();
    }

    function validateCredentials(){
        const emailErr = DataHelper.validateEmail(userCredentials.email);
        const passwordErr = DataHelper.validatePassword(userCredentials.password, undefined);

        setErrors((prevErros)=>{
            return {
                ...prevErros,
                'emailErr': emailErr,
                'passwordErr': passwordErr
            }
        })
    }

    return <div className="loginForm">
        <h2 className='page-label'>Login</h2>
        <form onSubmit={login}>
            <InputBox id={"email"} name="email" type="text" value={userCredentials.email} onChange={updateInput} label={"Identity"} placeHolder={"email or username"} error={errors.emailErr} ></InputBox>
            <br />
            <InputBox id={"password"} name="password" type="password" value={userCredentials.password} onChange={updateInput} label={"Password"} placeHolder={"********"} error={errors.passwordErr}></InputBox>
        </form>
        <div className='button-section'>
            <Button label={"Login"} style={loginButtonStyle} action={login} />
            <div className='alternate-section'>
                <p>Not having an account ?</p>
                <Button label={"Register"} style={registerButtonStyle} action={props.toggleForm} />
            </div>
        </div>
    </div>
}

export default LoginForm;
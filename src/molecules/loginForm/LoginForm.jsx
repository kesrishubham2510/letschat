import { useState } from "react";

import './loginForm.css';

import endpoints from '../../config/API';

import DataHelper from "../../utilities/DataValidator";

import InputBox from "../../atoms/inputBox/InputBox";
import Button from "../../atoms/button/Button";


function LoginForm(props) {

    const initialUserCredentials = {
        'email': '',
        'password': ''
    }

    const inititalErrors = {
        'emailErr': '',
        'passwordErr': ''
    }

    const [userCredentials, setUserCredentials] = useState(initialUserCredentials);

    const [errors, setErrors] = useState(inititalErrors)

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

    function updateInput(event) {
        const { name, value } = event.target;
        const errkey = name + 'Err';

        setUserCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [name]: value
            }
        });

        // to nullify the errors related to the rececntly updated field
        setErrors((prevErrors) => {
            return {
                ...prevErrors,
                [errkey]: ''
            }
        });
    }

    function login(event) {
        event.preventDefault();

        if (!areCredentialsValid()) {
            return;
        }

        console.log("User being logged in");

        const payload = {
            "username": userCredentials.email,
            "password": userCredentials.password
        }

        fetch(endpoints.login_endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((receivedRresponse) => {
            if (receivedRresponse.ok) {
                console.log('Response status:- ', receivedRresponse.status);
                // reset any error, 
                setErrors(() => {
                    return inititalErrors;
                })
                // empty the form fields
                setUserCredentials(() => {
                    return initialUserCredentials;
                })
                // navigate to user account
            } else if (receivedRresponse.status === 400 || receivedRresponse.status === 401) {
                console.log('Response status:- ', receivedRresponse.status);
                // show the field error
                receivedRresponse.json().then(response => handleException(response));
            } else {
                console.log('Do something for this issue');
                receivedRresponse.json().then(response => {
                    console.log(response);
                })
            }
        }).catch(err => {
            console.log(err);
        });

    }

    function areCredentialsValid() {

        let emailFieldValidation = ''

        if (userCredentials.email.includes('@'))
            emailFieldValidation = DataHelper.validateEmail(userCredentials.email);
        else
            emailFieldValidation = DataHelper.validateUsername(userCredentials.email);

        let passwordFieldValidation = DataHelper.validatePassword(userCredentials.password);

        const errObj = {
            'emailErr': emailFieldValidation,
            'passwordErr': passwordFieldValidation
        }

        const isIdentityFieldError = !DataHelper.isEmptyOrNull(emailFieldValidation);
        const isPasswordFieldError = !DataHelper.isEmptyOrNull(passwordFieldValidation);

        setErrors(errObj);

        let isValid = true;

        if (isIdentityFieldError || isPasswordFieldError) {
            isValid = false;
        }

        return isValid;
    }

    function handleException(exceptionMessageBody) {
        const key = exceptionMessageBody.key;

        if (key === 'INVALID_IDENTITY') {
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    'emailErr': 'User not found'
                }
            })
        } else if (key === 'WRONG_CREDENTIAL') {
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    'passwordErr': 'Wrong password'
                }
            })
        }

    }

    return <div className="loginForm">
        <h2 className='page-label'>Login</h2>
        <form>
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
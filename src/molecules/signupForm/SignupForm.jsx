import { useEffect, useState } from 'react';

import './signupForm.css';

import InputBox from '../../atoms/inputBox/InputBox';
import Button from '../../atoms/button/Button';
import DataHelper from '../../utilities/DataValidator';
import endpointMap from '../../config/API';

function SignupForm(props) {

    /*
        prop to customize the basic Button.jsx component,
        this is known as `Component Specialization`
    */

    const initialError = {
        'firstNameErr': '',
        'lastNameErr': '',
        'usernameErr': '',
        'emailErr': '',
        'passwordErr': '',
        'confirmPasswordErr': ''
    }

    const initialUserData = {
        'firstName': '',
        'lastName': '',
        'username': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    }

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

    const [userData, setUserData] = useState(initialUserData);

    const [errors, setErrors] = useState(initialError);

    function handleException(exceptionMessageBody) {
        const errorKey = exceptionMessageBody.key;

        if (errorKey === 'EMAIL_ALREADY_TAKEN') {
            setErrors(() => {
                return {
                    ...initialError,
                    'emailErr': 'Email is already registered'
                }
            });
        } else if (errorKey === 'USERNAME_ALREADY_TAKEN') {
            setErrors(() => {
                return {
                    ...initialError,
                    'usernameErr': 'Username is already registered'
                }
            });
        } else {
            // reset all errors
            setErrors(() => {
                return {
                    ...initialError
                }
            })
        }

    }


    function register(event) {

        event.preventDefault();

        const firstNameError = (DataHelper.validateFirstName(userData.firstName) === null) && errors.firstNameErr === '';
        const lastNameError = (DataHelper.validateLastName(userData.lastName) === null) && errors.lastNameErr === '';
        const emailError = (DataHelper.validateEmail(userData.email) === null) && errors.emailErr === '';
        const usernameError = (DataHelper.validateUsername(userData.username) === null) && errors.usernameErr === '';
        const passwordError = (DataHelper.validatePassword(userData.password, userData.confirmPassword) === null) && errors.passwordErr === '';


        if (!(firstNameError === false && lastNameError === false && emailError === false && usernameError === false && passwordError === false)) {
            console.log("hitting API:- " + endpointMap.registration_endpoint + " to register my user");

            setErrors(() => { initialError });


            // prepare the payload for POST request
            const payload = {
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "username": userData.username,
                "email": userData.email,
                "password": userData.password
            }
            const registrationData = fetch(
                endpointMap.registration_endpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            ).then(response => {

                if (response.ok) {
                    response.json().then(errResponse => {
                        console.log("Status is :- ", response.status, " response:- ", errResponse);
                        // clear the previously seen errors and entered userData
                        handleException(errResponse);
                        setUserData(() => {
                            return initialUserData
                        })

                        // navigate to user-profile page
                    })
                } else if (response.status === 400) {
                    response.json().then(errResponse => {
                        console.log("Status is :- ", response.status, " response:- ", errResponse);
                        handleException(errResponse);
                    })
                } else {
                    response.json().then(errResponse => {
                        console.log("Status is :- ", response.status, " response:- ", errResponse);
                        // Display a Modal to mention 'Something went wrong'
                    })
                }
            }).catch(err => {
                console.log("This is the err:- " + err);
            })
        }

    }



    function removeInputError(name) {
        setErrors((prevErrors) => {
            return {
                ...prevErrors,
                // to nullifythe error after input update
                [name]: ''
            }
        })
    }

    function updateInput(event) {
        const { name, value } = event.target;
        const errorKey = name + 'Err';

        setUserData((prevState) => {
            var updatedState = {
                ...prevState,
                // to avoid multiple words in first name
                [name]: value.trim()
            }

            if (errors[errorKey] === '') {
            } else {
                removeInputError(name);
            }

            return updatedState;
        });

    }

    return <div className="signupForm">
        <h2 className='page-label'>Registration</h2>
        <form onSubmit={register}>
            <InputBox id={"firstName"} name="firstName" type="text" value={userData.firstName} onChange={updateInput} label={"First name"} placeHolder="John" error={errors.firstNameErr} ></InputBox>
            <br />
            <InputBox id={"lastName"} name="lastName" type="text" value={userData.lastName} onChange={updateInput} label={"Last name"} placeHolder="Doe" error={errors.lastNameErr} ></InputBox>
            <br />
            <InputBox id={"userName"} name="username" type="text" value={userData.username} onChange={updateInput} label={"Username"} placeHolder="johnDoe#133" error={errors.usernameErr} ></InputBox>
            <br />
            <InputBox id={"email"} name="email" type="text" value={userData.email} onChange={updateInput} label={"Email"} placeHolder={"johndoe@example.com"} error={errors.emailErr} ></InputBox>
            <br />
            <InputBox id={"password"} name="password" type="password" value={userData.password} onChange={updateInput} label={"Password"} placeHolder={"********"} error={errors.passwordErr}></InputBox>
            <br />
            <InputBox id={"confirmPassword"} name="confirmPassword" type='text' value={userData.confirmPassword} onChange={updateInput} label={"Confirm password"} placeHolder={"********"}></InputBox>
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
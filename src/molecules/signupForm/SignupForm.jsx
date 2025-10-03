import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signupForm.css';

import { UserContext } from '../../config/GlobalState';

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

    const navigate = useNavigate();

    const [userData, setUserData] = useState(initialUserData);

    const [errors, setErrors] = useState(initialError);

    const { userState, setUserState } = useContext(UserContext);

    useEffect(() => {
        console.log('Userstate:- ', userState);

        if (userState.isRegistered) {
            console.log("The user account has been created successfully, navigating to the login page");
            navigate('/login')
        }
    }, [userState]);

    function handleException(exceptionMessageBody) {
        const errorKey = exceptionMessageBody.key;

        if (errorKey === 'EMAIL_ALREADY_TAKEN') {
            setErrors(() => {
                return {
                    ...initialError,
                    'emailErr': 'Email is already taken'
                }
            });
        } else if (errorKey === 'USERNAME_ALREADY_TAKEN') {
            setErrors(() => {
                return {
                    ...initialError,
                    'usernameErr': 'Username is already taken'
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

        const isValid = isInformationValid();

        if (!isValid)
            return;

        console.log("hitting API:- " + endpointMap.registration_endpoint + " to register my user");

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
                response.json().then(responseBody => {

                    // clear the previously entered userData
                    setUserData(() => {
                        return initialUserData
                    })

                    // also store the token in localStorage, to avoid token loss during browser refresh
                    // to handle availablity of auth token using useEffect 
                    // To add service workers to show offline experience

                    setUserState(() => {
                        return {
                            'userId': responseBody.userId,
                            'firstName': responseBody.firstName,
                            'lastName': responseBody.lastName,
                            'email': responseBody.email,
                            'username': responseBody.username,
                            'role': responseBody.role,
                            'joined': responseBody.joined,
                            'token': '',
                            'emailVerified': responseBody.emailVerified,
                            'isLoggedIn': false,
                            'isRegistered': true
                        }
                    })
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
            return updatedState;
        });

        removeInputError(errorKey);
    }

    function isInformationValid() {

        const firstNameValidationResult = DataHelper.validateFirstName(userData.firstName);
        const lastNameValidationResult = DataHelper.validateLastName(userData.lastName);
        const emailValidationResult = DataHelper.validateEmail(userData.email);
        const usernameValidationResult = DataHelper.validateUsername(userData.username);
        const passwordValidationResult = DataHelper.validatePassword(userData.password, userData.confirmPassword);

        const errorObject = {
            'firstNameErr': firstNameValidationResult,
            'lastNameErr': lastNameValidationResult,
            'usernameErr': usernameValidationResult,
            'emailErr': emailValidationResult,
            'passwordErr': passwordValidationResult,
            'confirmPasswordErr': ''
        }

        setErrors(errorObject);

        return Object.values(errorObject).every(err => !err);;
    }

    return <div className='signupFormWrapper'>
        <div className="signupForm">
            <h2 className='page-label'>Registration</h2>
            <form>
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
                    <Button label={"Login"} style={loginButtonStyle} action={() => { navigate('/login') }} />
                </div>
            </div>
        </div>
    </div>
}

export default SignupForm;
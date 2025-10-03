import { useState, useContext, useEffect } from "react";

import { UserContext } from "../../config/GlobalState";

import './loginForm.css';

import DataHelper from "../../utilities/DataValidator";

import InputBox from "../../atoms/inputBox/InputBox";
import Button from "../../atoms/button/Button";
import { Navigate, useNavigate } from "react-router-dom";
import APICalls from "../../utilities/APICall";
import DataValidator from "../../utilities/DataValidator";

function LoginForm(props) {

    const initialUserCredentials = {
        'email': '',
        'password': ''
    }

    const inititalErrors = {
        'emailErr': '',
        'passwordErr': ''
    }

    const { userState, setUserState } = useContext(UserContext);

    useEffect(() => {

        if(!DataHelper.isEmptyOrNull(userState.email)){
            setUserCredentials((prevState)=>{
                return {
                    ...prevState,
                    'email': userState.email
                }
            })

            return;
        }

        if (!DataHelper.isEmptyOrNull(userState.token)) {
            // Navigate to homeFeed
            console.log("Going to homeFeed, as there is a valid auth token");
        }

        if (!DataHelper.isEmptyOrNull(DataHelper.getAuthToken())) {
            console.log("Going to retrieve user details, as there is auth token");
            // try to retrieve user info
            APICalls.retrieveMyDetails(handleUserDetailRetrievalResponse);
        } else {
            console.log("There is no authToken, trying to fetch one using refresh-token");
            // it refresh-token API to get one JWT token
            APICalls.refreshMyJwtToken(handleTokenRefresh);
            // if the refresh API returns 4XX, then ask user to login
        }
    }, [])

    const navigate = useNavigate();
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

        APICalls.loginUser(payload, handleLoginResponse);
    }

    function handleTokenRefresh(receivedResponse) {

        const jwtToken = receivedResponse.headers.has('authorization') ? receivedResponse.headers.get('authorization') : 'no-token-received';

        if (receivedResponse.ok) {
            receivedResponse.json().then(receivedResponse => {
                DataHelper.setAuthToken(jwtToken);
            });

            APICalls.retrieveMyDetails(handleUserDetailRetrievalResponse);

        } else if (receivedResponse.status === 401) {
            DataHelper.removeAuthToken();
        }else if(receivedResponse.status === 403){
            console.log("No refresh-token cookie exists for the user, please login");
        }
    }

    function handleUserDetailRetrievalResponse(receivedResponse) {

        const jwtToken = receivedResponse.headers.has('authorization') ? receivedResponse.headers.get('authorization') : 'no-token-received';

        if (receivedResponse.ok) {
            console.log('Response status:- ', receivedResponse.status);
            // handle response
            setGlobalStateForUser(receivedResponse, jwtToken);
        } else if (receivedResponse.status === 400) {
            console.log('Response status:- ', receivedResponse.status);
            // show the field error
            receivedResponse.json().then(response => handleException(response));
        } else if (receivedResponse.status === 401) {
            APICalls.refreshMyJwtToken(handleTokenRefresh);
        } else {
            console.log('Do something for this issue');
            receivedResponse.json().then(response => {
                console.log(response);
            })
        }
    }

    function handleLoginResponse(receivedResponse) {
        const jwtToken = receivedResponse.headers.has('authorization') ? receivedResponse.headers.get('authorization') : 'no-token-received';

        if (receivedResponse.ok) {
            console.log('Response status:- ', receivedResponse.status);
            // handle response
            setGlobalStateForUser(receivedResponse, jwtToken);

        } else if (receivedResponse.status === 400 || receivedResponse.status === 401) {
            console.log('Response status:- ', receivedResponse.status);
            // show the field error
            receivedResponse.json().then(response => handleException(response));
        } else {
            console.log('Do something for this issue');
            receivedResponse.json().then(response => {
                console.log(response);
            })
        }
    }

    function setGlobalStateForUser(receivedResponse, jwtToken) {

        const contentType = receivedResponse.headers.get('Content-Type') || '';

        if (contentType !== '') {

            receivedResponse.json().then((parsedResponse) => {

                setErrors(() => {
                    return inititalErrors;
                })
                // empty the form fields
                setUserCredentials(() => {
                    return initialUserCredentials;
                })

                setUserState(() => {
                    return {
                        'userId': parsedResponse.userId,
                        'firstName': parsedResponse.firstName,
                        'lastName': parsedResponse.lastName,
                        'email': parsedResponse.email,
                        'username': parsedResponse.username,
                        'role': parsedResponse.role,
                        'joined': parsedResponse.joined,
                        'token': jwtToken,
                        'emailVerified': parsedResponse.emailVerified,
                        'isLoggedIn': jwtToken !== 'no-token-received' ? true : false,
                        'isRegistered': true
                    }
                })

                // set the authToken in localStorage
                DataValidator.setAuthToken(jwtToken);

                // set the user data & navigate to homeFeed
                navigate("/home");
            }).catch(err => {
                console.log("Error occured while parsing the response:- ", err);
            })
        }
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

    return <div className='loginFormWrapper'>
        <div className="loginForm">
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
                    <Button label={"Register"} style={registerButtonStyle} action={() => navigate('/register')} />
                </div>
            </div>
        </div>
    </div>
}

export default LoginForm;
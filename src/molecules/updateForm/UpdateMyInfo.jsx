import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../config/GlobalState';

import endpoints from '../../config/API';

import InputBox from "../../atoms/inputBox/InputBox";
import Button from "../../atoms/button/Button";

import './updateMyInfo.css';
import DataValidator from "../../utilities/DataValidator";
import { useNavigate } from "react-router-dom";

function UpdateMyInfo() {

    const initUserDetails = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "username": ""
    }

    const initUserDetailsErrors = {
        "firstNameErr": "",
        "lastNameErr": "",
        "emailErr": "",
        "usernameErr": ""
    }


    const { userState, setUserState } = useContext(UserContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(initUserDetails);
    const [userDetailErrors, setUserDetailErrors] = useState(initUserDetailsErrors);


    const cancelButton = {
        background: "whitesmoke",
        width: "40%",
        borderRadius: "10px",
        padding: "5px"
    }

    const updateButtonStyle = {
        ...cancelButton,
    }

    useEffect(() => {

        if (DataValidator.isEmptyOrNull(userState.token)) {
            if (DataValidator.getAuthToken() !== null) {
                // fetch the user details from API and set it into the GlobalState
                console.log('Retrieving user...')
                retrieveUser();
            } else {
                navigate('/login');
            }
        }


        // to pre-populate the form
        if (userState.isLoggedIn === true) {
            console.log('User is logged in, fetching the existing user information');
            setUserInfo((prevState) => {
                return {
                    ...prevState,
                    "firstName": userState.firstName,
                    "lastName": userState.lastName,
                    "email": userState.email,
                    "username": userState.username
                }
            })
        }

        console.log(userState);
    }, [userState.token]);

    // Update user input --> done
    // validate user input --> done, testing pending
    // handle and display errors thrown from backend --> local errors done
    // if everything is updated successfully, navigate to homeFeed
    // --> if backend API says to login again, in case of updated username then logout this user

    function updateInput(event) {

        const { name, value } = event.target;
        const erroKey = name + 'Err';

        setUserInfo((prevUserDetails) => {
            const updatedUserDetails = {
                ...prevUserDetails,
                [name]: value.trim()
            }

            return updatedUserDetails;
        });

        resetErrorOnField(erroKey);
    }

    function validateInputs() {

        const firstName = userInfo.firstName;
        let firstNameErr = ''

        if (firstName !== '') {
            firstNameErr = DataValidator.validateFirstName(firstName);
        }

        const lastName = userInfo.lastName;
        let lastNameErr = '';

        if (lastName !== '') {
            lastNameErr = DataValidator.validateLastName(lastName);
        }

        const username = userInfo.username;
        let usernameErr = ''

        if (username !== '') {
            usernameErr = DataValidator.validateUsername(username);
        }

        const email = userInfo.email;
        let emailErr = '';

        if (email !== '') {
            emailErr = DataValidator.validateEmail(email);
        }

        // to validate the empty form
        if (DataValidator.isEmptyOrNull(firstName) &&
            DataValidator.isEmptyOrNull(lastName) &&
            DataValidator.isEmptyOrNull(email) &&
            DataValidator.isEmptyOrNull(username)) {

            return false;
        }

        setUserDetailErrors(() => {
            return {
                "firstNameErr": firstNameErr,
                "lastNameErr": lastNameErr,
                "emailErr": emailErr,
                "usernameErr": usernameErr
            };
        })

        return (DataValidator.isEmptyOrNull(firstNameErr) &&
            DataValidator.isEmptyOrNull(lastNameErr) &&
            DataValidator.isEmptyOrNull(emailErr) &&
            DataValidator.isEmptyOrNull(usernameErr));

    }

    // find a way to move this function to a common place
    function retrieveUser() {

        const authToken = DataValidator.getAuthToken();

        fetch(endpoints.get_my_info_endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        }).then(response => {

            if (response.ok) {
                response.json().then(parsedResponse => {
                    // console.log('Status:- ', response.status, ', body:- ', parsedResponse);

                    setUserState(() => {
                        return {
                            'userId': parsedResponse.userId,
                            'firstName': parsedResponse.firstName,
                            'lastName': parsedResponse.lastName,
                            'email': parsedResponse.email,
                            'username': parsedResponse.username,
                            'role': parsedResponse.role,
                            'joined': parsedResponse.joined,
                            'token': authToken,
                            'emailVerified': parsedResponse.emailVerified,
                            'isLoggedIn': true,
                            'isRegistered': true
                        }
                    });

                    setUserInfo(() => {
                        return {
                            'firstName': parsedResponse.firstName,
                            'lastName': parsedResponse.lastName,
                            'email': parsedResponse.email,
                            'username': parsedResponse.username,
                        }
                    });
                });
            } else if (response.status !== 200) {
                response.json().then(parsedResponse => {
                    console.log('Status:- ', response.status, ', The token is incorrect/invalid, please proceed to login');
                    DataValidator.removeAuthToken();
                    navigate('/login');
                });
            }
        })
    }

    function resetErrorOnField(fieldName) {
        setUserDetailErrors((prevErrors) => {
            return {
                ...prevErrors,
                [fieldName]: ''
            }
        })
    }

    function cancelUpdate() {
        console.log('Update event cancelled');

        setUserDetailErrors(() => {
            return initUserDetailsErrors;
        });

        setUserInfo(() => {
            return initUserDetails
        })
    }

    function updateMyInfo() {
        const noErrors = validateInputs();
        console.log('Update userinfo with latest data called:- ', noErrors);

        if (noErrors === true) {
            console.log('Calling API to update th  information');

            const headersForRequest = {
                'Content-Type': 'application/json',
                'Authorization': userState.token
            }

            fetch(endpoints.update_my_info_endpoint, {
                method: 'PATCH',
                headers: headersForRequest,
                body: JSON.stringify(userInfo)

            }).then(response => {

                if (response.ok) {

                    response.json().then(parsedResponse => {
                        console.log('status:- ', response.status, 'response:- ', parsedResponse);

                        if (parsedResponse.nextStep === 'Please login again to continue') {
                            DataValidator.removeAuthToken();
                        }
                    });

                    fetch(endpoints.refresh_token_endpoint, {
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(response => {

                        response.headers.forEach((value, key) => {
                            console.log('Key;- ', key, ', value:- ', value);
                        })

                        response.json(parsedResponse => {
                            console.log('Parsed response:- ', parsedResponse);
                        })
                    })

                } else if (response.status === 400) {

                    response.json().then(parsedResponse => {
                        console.log('status:- ', response.status, 'response:- ', parsedResponse);

                        setUserDetailErrors((prevErrors) => {
                            return handleException(parsedResponse);
                        })
                    });

                } else if (response.status === 401) {
                    console.log("Trying to refresh the token");

                    response.json().then(parsedResponse => {
                        console.log('status:- ', response.status, 'response:- ', parsedResponse);
                    });

                    // fetch(endpoints.refresh_token_endpoint, {
                    //     credentials: "include",
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     }
                    // }).then(response => {

                    //     response.headers.forEach((value, key) => {
                    //         console.log('Key;- ', key, ', value:- ', value);
                    //     })

                    //     response.json(parsedResponse => {
                    //         console.log('Parsed response:- ', parsedResponse);
                    //     })
                    // })
                } else if (response.status === 403) {
                    response.json().then(parsedResponse => {
                        console.log('status:- ', response.status, 'response:- ', parsedResponse);
                    });
                }
            })
        }
    }

    function handleException(exceptionResponse) {
        const key = exceptionResponse.key;


        if (key === 'EMAIL_ALREADY_TAKEN') {
            return {
                "firstNameErr": '',
                "lastNameErr": '',
                "emailErr": 'Please use different email',
                "usernameErr": ''
            }
        } else if (key === 'USERNAME_ALREADY_TAKEN') {
            return {
                "firstNameErr": '',
                "lastNameErr": '',
                "emailErr": '',
                "usernameErr": 'Please use different username'
            }
        }
    }



    return <div className='updateInfoFormWrapper'>
        <div className="updateInfoForm">
            <h2 className='page-label'>Update Details</h2>
            <form>
                <InputBox id={"firstName"} name="firstName" type="text" value={userInfo.firstName} onChange={updateInput} label={"First name"} placeHolder="John" error={userDetailErrors.firstNameErr} ></InputBox>
                <br />
                <InputBox id={"lastName"} name="lastName" type="text" value={userInfo.lastName} onChange={updateInput} label={"Last name"} placeHolder="Doe" error={userDetailErrors.lastNameErr} ></InputBox>
                <br />
                <InputBox id={"userName"} name="username" type="text" value={userInfo.username} onChange={updateInput} label={"Username"} placeHolder="johnDoe#133" error={userDetailErrors.usernameErr} ></InputBox>
                <br />
                <InputBox id={"email"} name="email" type="text" value={userInfo.email} onChange={updateInput} label={"Email"} placeHolder={"johndoe@example.com"} error={userDetailErrors.emailErr} ></InputBox>
            </form>
            <div className='update-form-button-section'>
                <Button label={"Cancel"} style={cancelButton} action={cancelUpdate} />
                <Button label={"Update"} style={updateButtonStyle} action={updateMyInfo} />
            </div>
        </div>
    </div>
}

export default UpdateMyInfo;
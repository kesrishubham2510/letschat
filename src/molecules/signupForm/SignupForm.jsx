import { useState } from 'react';

import './signupForm.css';

import InputBox from '../../atoms/inputBox/InputBox';
import Button from '../../atoms/button/Button';
import DataHelper from '../../utilities/DataValidator';

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

    const [errors, setErrors] = useState({
        'firstNameErr': '',
        'lastNameErr': '',
        'emailErr': '',
        'passwordErr': '',
        'confirmPasswordErr': ''
    })

    function register(event) {
        event.preventDefault();
        validateData();
    }

    /*
        TODO:- Add some logic to show error that space is not allowed

    */

    function validateData() {

        const firstNameError = DataHelper.validateFirstName(userData.firstName);
        const lastNameError = DataHelper.validateLastName(userData.lastName);
        const emailError = DataHelper.validateEmail(userData.email);
        const passwordError = DataHelper.validatePassword(userData.password, userData.confirmPassword);

        setErrors((prevErrors) => {
            return {
                ...prevErrors,
                'firstNameErr': firstNameError,
                'lastNameErr': lastNameError,
                'emailErr': emailError,
                'passwordErr': passwordError
            }
        })

    }

    function updateInput(event) {
        const { name, value } = event.target;

        setUserData((prevState) => {
            var updatedState = {
                ...prevState,
                // to avoid multiple words in first name
                [name]: value.trim()
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
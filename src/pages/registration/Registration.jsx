import './registration.css';

import { useAsyncError, useNavigate } from 'react-router-dom';

import SignupForm from '../../molecules/signupForm/SignupForm';
import LoginForm from '../../molecules/loginForm/LoginForm';

import { useState } from 'react';

function Registration(props){

    const navigate = useNavigate();
    const [isRegistration, setIsRegistration]  = useState(props.isRegistration);

    /* this class will perform the registration with the data received
       from child component
    */

    function renderRegistrationForm(){
       navigate('/register');
    }

     function renderLoginForm(){
        navigate('/login');
    }

    return <div className="registration">
        {isRegistration ? <SignupForm toggleForm={renderLoginForm} /> : <LoginForm toggleForm={renderRegistrationForm}/>}
    </div>
}

export default Registration;
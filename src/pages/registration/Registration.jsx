import './registration.css';

import SignupForm from '../../molecules/signupForm/SignupForm';
import LoginForm from '../../molecules/loginForm/LoginForm';

import { useState } from 'react';

function Registration(){

    const [isRegistration, setIsRegistration] = useState(true);

    /* this class will perform the registration with the data received
       from child component
    */

    function toggleForm(){
        console.log("This is happening!!")
        setIsRegistration((isRegistration)=> !isRegistration);
    }

    return <div className="registration">

        {isRegistration ? <SignupForm toggleForm={toggleForm} /> : <LoginForm toggleForm={toggleForm}/>}
    </div>
}

export default Registration;
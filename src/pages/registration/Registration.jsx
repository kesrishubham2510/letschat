import './registration.css';

import '../../molecules/signupForm/SignupForm';
import SignupForm from '../../molecules/signupForm/SignupForm';

import { useState } from 'react';

function Registration(){

    const [isRegistration, setIsRegistration] = useState(true);

    function toggleForm(){
        console.log("This is happening!!")
        setIsRegistration((isRegistration)=> !isRegistration);
    }

    return <div className="registration">
        {isRegistration ? <SignupForm toggleForm={toggleForm} /> : <h1>This is Login form</h1>}
    </div>
}

export default Registration;
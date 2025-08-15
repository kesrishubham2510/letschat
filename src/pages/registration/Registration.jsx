import './registration.css';

import '../../molecules/signupForm/SignupForm';
import SignupForm from '../../molecules/signupForm/SignupForm';

import { useState } from 'react';

function Registration(){

    const [isRegistration, setIsRegistration] = useState(true);

    return <div className="registration">
        {isRegistration ? <SignupForm/> : <h1>This is Login form</h1>}
    </div>
}

export default Registration;
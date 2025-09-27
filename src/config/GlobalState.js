// To maintain app-wide state

import { createContext, useContext, useState } from "react";

let initialUserState = {
    'userId' : '',
    'firstName' : '',
    'lastName' : '',
    'email' : '',
    'username' : '',
    'role' : '',
    'joined' : '',
    'token' : '',
    'emailVerified' : '',
    'isLoggedIn': true,
    'isRegistered': false
}

const UserContext = createContext();

const GlobalStateProvider = ({children}) =>{
    const [userState, setUserState] = useState(initialUserState);

    return <UserContext.Provider  value = {{userState, setUserState}}>
        {children}
        </UserContext.Provider>
};

// conusmer
export  { UserContext };

// Provider
export default GlobalStateProvider;
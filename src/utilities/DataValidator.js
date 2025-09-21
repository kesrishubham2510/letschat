function validateFirstName(firstName){
    
    if(firstName==='')
        return 'Can\'t be empty';

    return null;
}

function validateLastName(lastName){
    if(lastName==='')
        return 'Can\'t be empty';

    return null;
}

function validateEmail(email){
    if(email==='')
        return 'Can\'t be empty';

    if(!email.includes('@'))
        return 'Invalid email';

    return null;
}

function validatePassword(password, confirmPassword){
    if(password==='')
        return 'Can\'t be empty';

    if(confirmPassword!==undefined && !(password === confirmPassword))
        return 'Passwords don\'t match';

    return null;
}

function validateUsername(username){
    if(username==='')
        return 'Can\'t be empty';

    return null;
}

export default {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validateUsername
}
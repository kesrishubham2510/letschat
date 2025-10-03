// This file keeps all the endpoint appings

let httpProtocol = 'http://';
let httpsProtocol = 'https://';

let protocol = httpProtocol;

let api_user_host= 'localhost:8001/api/users';
let api_auth_host= 'localhost:8000/api-auth'


const endpoints = {
    login_endpoint : protocol + api_user_host + '/login',
    refresh_token_endpoint : protocol + api_auth_host + '/refresh-token',
    registration_endpoint : protocol + api_user_host + '/register',
    update_my_info_endpoint : protocol + api_user_host + '/me',
    get_my_info_endpoint : protocol + api_user_host + '/me'
}

export default endpoints



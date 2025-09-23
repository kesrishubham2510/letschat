// This file keeps all the endpoint appings

let httpProtocol = 'http://';
let httpsProtocol = 'https://';

let protocol = httpProtocol;

let api_user_host= 'localhost:8001/api/users';
let api_auth_host= 'localhost:8000/api-auth'


const endpoints = {
    login_endpoint : protocol + api_user_host + '/login',
    refresh_token_endpoint : protocol + api_user_host + '/refresh-token',
    registration_endpoint : protocol + api_user_host + '/register'
}

export default endpoints



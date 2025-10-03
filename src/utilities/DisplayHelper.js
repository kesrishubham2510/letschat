function DisplayHeader(path){
    return !(path=== '/' || path === '/login' || path === '/register');
}

function DisplayFooter(path){
    return DisplayHeader(path);
}

export {
    DisplayHeader,
    DisplayFooter
}
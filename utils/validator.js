const userNameValidator = function (userName) {
    if (userName.length < 3) {
        return false
    } 
    return true
}

const passwordValidator = function (password) {
    if (password.length < 5) {
        return false
    }
    return true
}


export {
    userNameValidator, 
    passwordValidator
}
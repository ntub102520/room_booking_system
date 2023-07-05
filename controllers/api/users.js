import * as validator from '../../utils/validator.js'


const registration = async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    if (validator.userNameValidator(userName) && validator.passwordValidator(password)) {
        return res.status(201).json({"msg": "User created!"})
    } else {
        return res.status(400).json({"msg": "Invalid input!"})
    }
}

export {
    registration
}
import * as validator from '../../utils/validator.js'
import { Db } from '../../models/DB.js'
import bcrypt from 'bcrypt';

// Init DB
let DB = new Db()
await DB.connect()

const registration = async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password 
    if (await DB.checkUserExist(userName)){
        if (await DB.checkPassword(userName, password)){
            return res.status(200).json({"msg": "User exists!"})
        } else {
            return res.status(400).json({"msg": "Password incorrect!"})
        }
        // return res.status(400).json({"msg": "duplicate account!"})
    }
    
    if (validator.userNameValidator(userName) && validator.passwordValidator(password)) {
        // register into DB
        const hash_pwd = await bcrypt.hash(password, 10)
        await DB.register(userName, hash_pwd)
        return res.status(201).json({"msg": "User created!"})
    } else {
        return res.status(400).json({"msg": "Invalid input!"})
    }
}


export {
    registration
}
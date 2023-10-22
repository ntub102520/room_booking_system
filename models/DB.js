import * as MysqlDB from "mysql2/promise";
import { env } from "../config/env.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

class Db {
    constructor() {
        this.conn = null;
    }

    async connect() {
        this.conn = await MysqlDB.createConnection({
            host: env.Db_host,
            port: env.Db_port,
            user: env.Db_user,
            password: env.Db_password,
            database: env.Db_databse
        })
    }

    async register(username, password) {
        this.conn.execute('INSERT INTO `users` (user_id, account, password) VALUES (?, ?, ?)', [uuidv4(), username, password])
    }

    async checkUserExist(username){
        const [rows, fields] = await this.conn.execute('SELECT account FROM users WHERE account = ?', [username]);
        if (rows.length === 0) {
            return false
        }else {
            return true
        }
    }
    
    async checkPassword(username, password){
        const hash_pwd = await bcrypt.hash(password, 10)
        const [rows, fields] = await this.conn.execute('SELECT password FROM users WHERE account = ?', [username]);
        
        const match = await bcrypt.compare(password, rows[0].password); //印出password後面的字串
        if (match) {
            return true 
        }else {
            return false
        }
    }
}

export {
    Db
}
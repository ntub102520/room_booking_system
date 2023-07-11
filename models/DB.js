import * as MysqlDB from "mysql2/promise";
import { env } from "../config/env.js";
import { v4 as uuidv4 } from 'uuid';

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

}

export {
    Db
}
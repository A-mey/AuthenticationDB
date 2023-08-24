import { Dialect } from 'Sequelize';
import { Model, Sequelize } from 'sequelize-typescript';

class SqlService {
    private database = process.env.DATABASE as string;
    private user = process.env.USER_NAME as string;
    private password = process.env.PASSWORD;
    private host = process.env.HOST;
    private dialect: Dialect = process.env.DIALECT as Dialect;
    public sequelize: Sequelize | undefined
    public Model = Model;

    constructor() {
        this.connectWithRetry();
    }

    getSequelize() {
        return this.sequelize;
    }

    connectWithRetry() {
        // console.log("Credentials", this.database +" "+ this.user+" "+ this.password+" "+ this.host +" "+ this.dialect.toString())
        this.sequelize = new Sequelize(
            this.database,
            this.user,
            this.password,
             {
               host: this.host,
               dialect: this.dialect,
               omitNull: true
             }
        );

        this.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
         }).catch((error: any) => {
            console.error('Unable to connect to the database: ', error);
         });
    }
}

export default new SqlService()
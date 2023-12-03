import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import { catchError } from "../../utils/catch.util";

export class CommonSequelizeService {
	private database = process.env.DATABASE as string;
	private user = process.env.USER_NAME as string;
	private password = process.env.PASSWORD;
	private host = process.env.HOST;
	private dialect: Dialect = process.env.DIALECT as Dialect;
    private dbUrl = process.env.DATABASE_URL

	public sequelize: Sequelize = new Sequelize(
        this.database,
        this.user,
        this.password,
        {
            host: this.host,
            dialect: this.dialect,
            omitNull: true
        }
    );

    constructor() {
        this.connectWithRetry();
    }

    getSequelize() {
		return this.sequelize;
	}

	connectWithRetry() {
		this.sequelize.authenticate().then(() => {
			console.log("Connection has been established successfully.");
		}).catch(async (error: unknown) => {
			console.log(error)
			console.error("Unable to connect to the database: ", await catchError(error));
		});
	}
}
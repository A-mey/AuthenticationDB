import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

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
}
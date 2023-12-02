import { catchError } from "../../utils/catch.util";
import { CommonSequelizeService } from "./common.sequelize.service"

export class ConnectSequelizeService extends CommonSequelizeService {

	constructor() {
		super();
        this.connectWithRetry();
	}

	getSequelize() {
		return this.sequelize;
	}

	connectWithRetry() {
		// console.log(this.sequelize)
		this.sequelize.authenticate().then(() => {
			console.log("Connection has been established successfully.");
		}).catch(async (error: unknown) => {
			console.log(error)
			console.error("Unable to connect to the database: ", await catchError(error));
		});
	}
}
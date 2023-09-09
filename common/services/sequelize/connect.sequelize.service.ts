import { catchError } from "../../helpers/catch.helper";
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
		this.sequelize.authenticate().then(() => {
			console.log("Connection has been established successfully.");
		}).catch(async (error: unknown) => {
			console.error("Unable to connect to the database: ", await catchError(error));
		});
	}
}
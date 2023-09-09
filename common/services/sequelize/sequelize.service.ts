import { ConnectSequelizeService } from "./connect.sequelize.service";

export class SequelizeService extends ConnectSequelizeService {

	constructor() {
		super();
	}

	getSequelize() {
		return this.sequelize;
	}
}

export default new SequelizeService();
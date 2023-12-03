import { CommonSequelizeService } from "./common.sequelize.service";

export class SequelizeService extends CommonSequelizeService {

	constructor() {
		super();
	}

	getSequelize() {
		return this.sequelize;
	}
}
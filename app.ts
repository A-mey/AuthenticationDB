import express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
// const dotenvResult = dotenv.config();
const dotenvResult = dotenv.config({ path: `.env.${process.env.DEPLOY_STAGE}` })
if (dotenvResult.error) {
	throw dotenvResult.error;
}
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import {CommonRoutesConfig} from "./common/common.routes.config";
import {LoginRoutes} from "./userDB/routes/userDB.routes.config";
import {AuthRoutes} from "./Auth/routes/Auth.routes.config";
// import { SipSQL } from './common/services/DAL/sql.service.sip';
// import { SQLService } from './common/services/DAL/sql.service';
// import {validationErrorMiddleware} from "./common/error/validationErrorMiddleware.error";
import debug from "debug";
import bodyParser from "body-parser";
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
// const sqlConnections: Array<SQLService> = [];
const debugLog: debug.IDebugger = debug("app");
import helmet from "helmet";


// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());
app.use(bodyParser.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors({
	origin: '*'
}));

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console(),
		new winston.transports.File({
			// level: 'error',
			// Create the log directory if it does not exist
			filename: "Documents/Bookoto/logs/example.log"
		})],
	format: winston.format.combine(
		// winston.format.json(),
		winston.format.label({
			label: "Label🏷️"
		}),
		winston.format.timestamp({
			format: "MMM-DD-YYYY HH:mm:ss"
		}),
		winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (!process.env.DEBUG) {
	loggerOptions.meta = false; // when not debugging, log requests as one-liners
	if (typeof global.it === "function") {
		loggerOptions.level = "http"; // for non-debug test runs, squelch entirely
	}
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new LoginRoutes(app));
routes.push(new AuthRoutes(app));

app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));

// sqlConnections.push(new SipSQL);
// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (_req: express.Request, res: express.Response) => {
	res.status(200).send(runningMessage);
});

// app.use(validationErrorMiddleware);
app.use(helmet());


server.listen(port, () => {
	routes.forEach((route: CommonRoutesConfig) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});
	// our only exception to avoiding console.log(), because we
	// always want to know when the server is done starting up
	console.log(runningMessage);
	// let usersRoutes:any = new UsersRoutes(app);

});

export {app, server};
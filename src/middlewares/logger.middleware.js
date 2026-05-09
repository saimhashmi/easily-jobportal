// import fs from "fs";
import path from "path";

// const logStream = fs.createWriteStream(path.join("logs", "server.log"), {
// 	flags: "a",
// });

const logger = (req, res, next) => {
	const startTime = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - startTime;
		const logMessage = `[${new Date().toISOString()}]:- Request Type: ${req.method}, Route: "${req.originalUrl}", Status Code: ${res.statusCode}, Duration: ${duration}ms`;

		// logStream.write(logMessage);
		console.log(logMessage.trim());
	});

	next();
};

export default logger;

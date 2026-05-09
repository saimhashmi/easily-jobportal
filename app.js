// Import neccessary modules
import express from "express";
import path from "path";
import os from "os";
import ejsLayouts from "express-ejs-layouts";
// Import controllers
import HomeController from "./src/controllers/home.controller.js";
// Import middlewares
import logger from "./src/middlewares/logger.middleware.js";

const networkInterfaces = os.networkInterfaces();
const host = networkInterfaces["Wi-Fi"].at(-1).address;
const port = 8080;
const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Use Express-EJS-Layouts
app.use(ejsLayouts);

// For the public folder
app.use(express.static("public"));

// For the views folder
app.use(express.static("src/views"));

app.use(logger);

// Set view engine
app.set("view engine", "ejs");
// Set views Path
app.set("views", path.join(path.resolve(), "src", "views"));

// Create an instance of HomeController
const homeController = new HomeController();

app.get("/", homeController.getMain);

app.listen(port, host, () => {
	console.log(
		`Server is listening on port ${port}, navigate to link http://${host}:${port}`,
	);
});

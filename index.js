// const express = require("express");
import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

import { auth } from "./src/middlewares/auth.middleware.js";

const port = 3000;
const server = express();

// Parse form data
server.use(express.urlencoded({ extended: true }));

// Use Express-EJS-Layouts
server.use(ejsLayouts);

// Use Express-Session
server.use(
	session({
		secret: "SecretKey",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	}),
);

// Use Cookie-Parser
server.use(cookieParser());

// For the public folder
server.use(express.static("public"));

// For the assets folder
server.use("/assets", express.static("assets"));

// For the views folder
server.use(express.static("src/views"));

// Set view engine
server.set("view engine", "ejs");
// Set views Path
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/", (req, res) => {
	return res.send("Welcome to the Easily");
});

server.listen(port, () => {
	console.log(
		`Server is listening on port ${port}, navigate to link http://localhost:${port}`,
	);
});

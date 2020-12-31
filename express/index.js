const express = require("express");
const prerender = require("prerender-node");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const main = async () => {
	//env
	dotenv.config({ path: path.join(__dirname, ".env") });
	dotenv.config({ path: path.join(__dirname, ".env.default") });
	// if (!process.env.prerender_token)
	// 	throw new Error("Token of prerender is needed. Register first.");

	//routes
	var routes = {
		"/data": (req, res) =>
			setTimeout(() => res.json({ hello: "world" }), 100),
		"/increment": (req, res) =>
			setTimeout(
				() => res.json({ increment: parseInt(req.query.number) + 1 }),
				100
			),
		"/health": (req, res) => res.send("healthy"),
	};

	//express
	var app = express();
	app.use(cors());
	for (var route in routes) app.get(route, routes[route]);

	// app.use(prerender.set("prerenderToken", process.env.prerender_token));
	app.use(express.static(path.join(__dirname, "public")));
	app.get("/*", (req, res) =>
		res.sendFile(path.join(__dirname, "public", "index.html"))
	);
	app.listen(3000);
	console.log("server started");
};

if (require.main === module) main().catch((e) => console.error(e));

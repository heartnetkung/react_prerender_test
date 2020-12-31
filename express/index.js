const express = require("express");
const cors = require("cors");

const main = async () => {
	//routes
	var routes = {
		"/data": (req, res) =>
			setTimeout(() => res.json({ hello: "world" }), 100),
		"/increment": (req, res) =>
			setTimeout(
				() => res.json({ increment: parseInt(req.query.number) + 1 }),
				100
			),
	};

	//express
	var app = express();
	app.use(cors());
	for (var route in routes) app.get(route, routes[route]);
	app.listen(3000);
	console.log("server started");
};

if (require.main === module) main().catch((e) => console.error(e));

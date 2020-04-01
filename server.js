require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const pplController = require("./controller/pplController");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		defaultLayout: "mainLayout",
		layoutsDir: __dirname + "/views/layouts/"
	})
);
app.set("view engine", "hbs");

app.listen(3000, () => {
	console.log("Express server started on port: 3000");
});

app.use("/ppl", pplController);

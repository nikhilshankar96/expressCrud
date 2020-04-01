const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost:27017/ppldb",
	{ useNewUrlParser: true },
	err => {
		if (!err) {
			console.log("MongoDB connection successful!");
		} else {
			console.log("Error: " + err);
		}
	}
);

require("./ppl.model");

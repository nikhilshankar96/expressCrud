const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const ppl = mongoose.model("People");

router.get("/", (req, res) => {
	res.render("ppl/addOrEdit", { viewTitle: "Insert details" });
});

router.post("/", (req, res) => {
	if (req.body._id == "") insertRecord(req, res);
	else updateRecord(req, res);
});

router.get("/list", (req, res) => {
	ppl.find((err, docs) => {
		if (!err) {
			res.render("ppl/list", {
				list: docs
			});
		} else {
			console.log("Error: " + err);
		}
	});
});

router.get("/:id", (req, res) => {
	ppl.findById(req.params.id, (err, doc) => {
		if (!err) {
			res.render("ppl/addOrEdit", {
				viewTitle: "Update",
				person: doc
			});
		}
	});
});

router.get("/delete/:id", (req, res) => {
	ppl.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {
			res.redirect("/ppl/list");
		} else {
			console.log("Error: " + err);
		}
	});
});

function insertRecord(req, res) {
	let person = new ppl();
	person.email = req.body.email;
	person.password = req.body.password;
	person.save((err, doc) => {
		// console.log(person);
		if (!err) res.redirect("ppl/list");
		else {
			if (err.name == "ValidationError") {
				handleValidationError(err, req.body);
				res.render("ppl/addOrEdit", {
					viewTitle: "Insert details",
					person: req.body
				});
			}
			console.log("Error: " + err);
		}
	});
}

function updateRecord(req, res) {
	ppl.findOneAndUpdate(
		{ _id: req.body._id },
		req.body,
		{ new: true },
		(err, doc) => {
			if (!err) {
				res.redirect("ppl/list");
			} else {
				if (err.name == "ValidationError") {
					handleValidationError(err, req.body);
					res.render("ppl/addOrEdit", {
						viewTitle: "Update",
						person: req.body
					});
				} else {
					console.log("Error: " + err);
				}
			}
		}
	);
}

function handleValidationError(err, body) {
	for (field in err.errors) {
		switch (field) {
			case "email":
				body["emailError"] = err.errors[field].message;
				break;

			case "password":
				body["passwordError"] = err.errors[field].message;
				break;

			default:
				break;
		}
	}
}

module.exports = router;

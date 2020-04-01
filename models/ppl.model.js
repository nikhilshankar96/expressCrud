const mongoose = require("mongoose");

let pplSchema = new mongoose.Schema({
	email: {
		type: String,
		required: "Email is a required field!"
	},
	password: {
		type: String,
		required: "Password is a required field!"
	}
});

pplSchema.path("email").validate(val => {
	reg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
	return reg.test(val);
}, "Invalid email!");

pplSchema.path("password").validate(val => {
	reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,25}$/g;
	return reg.test(val);
}, "Password must 8-25 in length and contain at least one capital letter, one number and one special character!");

mongoose.model("People", pplSchema);

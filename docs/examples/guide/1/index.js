debugger;
let myform = InputValidationNext(document.getElementById("myform"), {
	submitHandler: function (event) {
		console.log(this); // `this` contain many common info.
		console.log(event); // event of form submit
	},
	rules: {
		inputName2: {
			email: true,
		},
	},
	messages: {
		inputName2: "Custom error message for userEmail input.",
	},
});

import {InputValidationNext} from "../../src/index";

let test = document.getElementById("form-2");

let plugin = InputValidationNext(document.getElementById("form-2"), {
	disableFormSubmitEvent: true,
	rules: {
		["date-input"]: {
			required: true,
		},
		// ["unchecked-radio-input"]: {
		// 	required: true,
		// },
	},
});

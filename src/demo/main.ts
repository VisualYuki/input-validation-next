import {InputValidationNext} from "../index.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./jquery-validation-test.ts";

globalInputValidationNext.addRule(
	"customRule",
	function (value: string) {
		return value === "qwe123";
	},
	"Value isn't equal to 'qwe123'"
);

// @ts-ignore
let test = InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {
	submitHandler: function () {
		console.log("form is submited");
	},
	rules: {
		//defaultAttrInput: {
		//	customRule: true,
		//	//required: true,
		//	minLength: 4,
		//},
		noExistProp: {
			range: [3, 5],
			rqeuid: true,
		},
		numberInputName: {
			range: [3, 5],
		},
		customRuleInput: {
			//@ts-ignore
			required: 12,
			customRule: true,
		},
	},
	messages: {
		defaultAttrInput: {
			required: "Required custom message for defaultAttrInput input",
		},
		customRuleInput: {
			required: "Required custom message",
		},
		noExistProp: {
			required: "Custom error message",
		},
	},
	enableDefaultValidationForm: false,
	disableFormSubmitEvent: true,
});

InputValidationNext(document.getElementById("form-2") as HTMLFormElement, {
	submitHandler: function () {
		console.log("form is submited");
	},
	invalidHandler: function () {
		console.log("form is submited");
	},
});

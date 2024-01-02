import {InputValidationNext} from "../index.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

globalInputValidationNext.addValidator(
	"customRule",
	function (value: string) {
		return value === "qwe123";
	},
	"Value isn't equal to 'qwe123'"
);

// @ts-ignore
let test = InputValidationNext(document.getElementById("form-112") as HTMLFormElement, {
	debug: false,
	errorClass: "errorClass",
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
		},
		numberInputName: {
			range: [3, 5],
		},
		customRuleInput: {
			required: true,
			customRule: true,
		},
	},
	messages: {
		customRuleInput: {
			required: "Required custom message",
		},
		noExistProp: {
			required: "Custom error message",
		},
	},
	config: {
		enableDefaultValidationForm: false,
		disableFormSubmitEvent: true,
	},
});

InputValidationNext(document.getElementById("form-2") as HTMLFormElement, {
	submitHandler: function () {
		console.log("form is submited");
	},
});

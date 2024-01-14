import {InputValidationNext} from "../src/index";
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
let form1 = InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {
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
	dsflsdf: 12,
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

let form2 = InputValidationNext(document.getElementById("form-2") as HTMLFormElement, {
	submitHandler: function () {
		console.log("form is submited");
		console.log(form2?.isValidForm());
	},
	invalidHandler: function () {
		console.log("form isn't submited");
		console.log(form2?.isValidForm());
	},
	disableFormSubmitEvent: true,
});

//form2?.validate();
//form2?.destroy();

form1?.removeRules(document.querySelector("#form-1 [name='defaultAttrInput']") as HTMLInputElement, ["minLength"]);
form1?.addRules(document.querySelector("#form-1 [name='defaultInput']") as HTMLInputElement, {
	rules: {minLength: 4, required12: 14},
	messages: {
		minLength: "custom minLenght message from addRules",
		dsdf: "12",
	},
});

// @ts-ignore
let form4 = InputValidationNext(document.getElementById("form-4") as HTMLFormElement, {
	submitHandler: function () {
		console.log("form is submited");
		console.log(form2?.isValidForm());
	},
	invalidHandler: function () {
		console.log("form isn't submited");
		console.log(form2?.isValidForm());
	},
	rules: {
		requiredInput: {
			url: true,
		},
	},
});

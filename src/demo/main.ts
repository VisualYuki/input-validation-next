import {InputValidationNext} from "../index.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

globalInputValidationNext.addValidator(
	"customRule",
	function (value: string) {
		return value === "qwe123";
	},
	"qwe123"
);

// @ts-ignore
let test = InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {
	rules: {
		defaultAttrInput: {
			customRule: true,
			//required: true,
			minLength: 4,
		},
		numberInputName: {
			range: [3, 5],
		},
		customRuleInput: {
			required: true,
			minLength: 4,
		},
	},
	messages: {
		customRuleInput: {
			required: "Required custom message from message field of init",
		},
	},
	config: {
		enableDefaultValidationForm: true,
	},
});

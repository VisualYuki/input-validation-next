import {InputValidationNext} from "./index";

globalInputValidationNext.addValidator(
	"UserNameValidator",
	function (value: any, element: any) {
		return;
	},
	"Должны быть и цифры и буквы"
);
debugger;
let test = new InputValidationNext(document.getElementById("first-form") as HTMLFormElement, {
	rules: {
		userNameInput: {
			//UserNameValidator: true,
			required: true,
		},
	},
});

//console.log(globalInputValidationNext);

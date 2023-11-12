import {InputValidationNext} from "./index";
//import {messages_ru} from "./localization/messages_ru";
//import "/src/localization/messages_ru.ts";

globalInputValidationNext.addValidator(
	"UserNameValidator",
	function (value: any, element: any) {
		return false;
	},
	"Должны быть цифры и буквы."
);

//globalInputValidationNext.setValidatorMessages(messages_ru);

let test = new InputValidationNext(document.getElementById("first-form") as HTMLFormElement, {
	rules: {
		userNameInput: {
			UserNameValidator: true,
			//required: true,
			minLength: 4,
		},
		numberInputName: {
			range: [3, 5],
		},
	},
});

//test.validate();

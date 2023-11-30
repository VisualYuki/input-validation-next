import {InputValidationNext} from "./index";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

globalInputValidationNext.addValidator(
	"customRule",
	function (value: any, element: any) {
		return value === "qwe123";
	},
	"qwe123"
);

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
	},
});

//import {messages_ru} from "./localization/messages_ru";
//import "/src/localization/messages_ru.ts";
//globalInputValidationNext.setValidatorMessages(messages_ru);

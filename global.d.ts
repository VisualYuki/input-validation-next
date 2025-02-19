import {type globalInputValidationNext} from "./src/global-instance";
//import {Messages, MessagesOptional} from "./src/localization/messages_en";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
		InputValidationNext: InputValidationNext;
		messages_ru: any;
	}
}

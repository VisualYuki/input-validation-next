import {globalInputValidationNext} from "./src/globInstance";
//import {Messages, MessagesOptional} from "./src/localization/messages_en";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

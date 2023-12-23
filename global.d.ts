import {globalInputValidationNext} from "./src/global";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	type ConfigRule = {
		required?: boolean;
		minLength?: number;
		[index?: string]: boolean | number | Array | string;
	};

	type Config = {
		rules?: {
			[index: string]: ConfigRule;
		};
		config?: {
			//validateOnSubmit: boolean;
			enableDefaultValidationForm: boolean;
		};
		messages?: {
			[index: string]: TMessages;
		};
	};

	type TMessages = TMessages;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

import {globalInputValidationNext} from "./src/global";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	type ConfigRule = {
		required?: boolean;
		[index?: string]: boolean;
	};

	type Config = {
		rules?: {
			[index: string]: ConfigRule;
		};
	};

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

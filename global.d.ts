import {globalInputValidationNext} from "./src/global";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	type ConfigRule = {
		required?: boolean;
		minLength?: number;
		[index?: string]: boolean | number | Array;
	};

	type Config = {
		rules?: {
			[index: string]: ConfigRule;
		};
	};

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}

	//type TMessages = {
	//	required: string;
	//	minLength: string;
	//};
}

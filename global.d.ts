import {globalInputValidationNext} from "./src/global";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

	type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	type ConfigRule = {
		required?: boolean;
		minLength?: number;
		[index?: string]: boolean | number | Array | string;
	};

	type UserConfig = {
		debug?: boolean;
		submitHandler?: () => void;
		inputElementClass?: string;
		inputElementErrorClass?: string;
		inputElementSuccessClass?: string;
		errorElementClass?: string;
		errorElementTag?: string;
		rules?: {
			[index: string]: ConfigRule;
		};
		config?: {
			//validateOnSubmit: boolean;
			enableDefaultValidationForm: boolean;
			disableFormSubmitEvent: boolean;
		};
		messages?: {
			[index: string]: TMessages;
		};
	};

	type localConfig = {
		[Property in keyof UserConfig]-?: UserConfig[Property];
	};

	type TMessages = TMessages;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

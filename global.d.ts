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
		// todo: event не уверен, что точный.
		submitHandler?: (form: HTMLFormElement, event: SubmitEvent) => void;
		rules?: {
			[index: string]: ConfigRule;
		};

		messages?: {
			[index: string]: Messages;
		};
		debug?: boolean;
		inputElementClass?: string;
		inputElementErrorClass?: string;
		inputElementSuccessClass?: string;
		errorElementClass?: string;
		errorElementTag?: string;
		onSubmitFocusInvalid?: boolean;
		enableDefaultValidationForm?: boolean;
		disableFormSubmitEvent?: boolean;
		//onFocusCleanup?: boolean;
	};

	type localConfig = {
		[Property in keyof UserConfig]-?: UserConfig[Property];
	};

	type Messages = Messages;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

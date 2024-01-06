import {globalInputValidationNext} from "./src/global";
import {TMessages, TMessagesOptional} from "./src/localization/messages_en";
declare global {
	let globalInputValidationNext: globalInputValidationNext;

	type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	type ConfigRule = {
		required?: boolean;
		minLength?: number;
		[index?: string]: boolean | number | Array | string;
	};

	type handlerThis = {
		config: {
			submitHandler: (this: handlerThis, event: SubmitEvent) => void;
			invalidHandler: (this: handlerThis, event: SubmitEvent) => void;
			rules: {
				[index: string]: ConfigRule;
			};
			messages: {
				[index: string]: any;
			};
			debug: boolean;
			inputElementClass: string;
			inputElementErrorClass: string;
			inputElementSuccessClass: string;
			errorElementClass: string;
			errorElementTag: string;
			onSubmitFocusInvalid: boolean;
			enableDefaultValidationForm: boolean;
			disableFormSubmitEvent: boolean;
		};
		formElement: HTMLFormElement;
		submitButton: HTMLInputElement | HTMLButtonElement | null;
		inputList: FormElements[];
		successList: FormElements[];
		errorList: {
			element: FormElements;
			message: string;
			rule: string;
		}[];
	};

	type UserConfig = {
		submitHandler?: (this: handlerThis, event: SubmitEvent) => void;
		invalidHandler?: (this: handlerThis, event: SubmitEvent) => void;
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

	type TMessagesOptional = _TMessagesOptional;
	type TMessagesOptionalAny = _TMessagesOptionalAny;
	type TMessagesAny = _TMessagesAny;
	type TMessages = _TMessages;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

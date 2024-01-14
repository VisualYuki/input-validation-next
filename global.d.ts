import {globalInputValidationNext} from "./src/global";
import {Messages, MessagesOptional} from "./src/localization/messages_en";

declare global {
	let globalInputValidationNext: globalInputValidationNext;

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
		inputList: FormInput[];
		successList: FormInput[];
		errorList: {
			element: FormInput;
			message: string;
			rule: string;
		}[];
	};

	export type UserConfig = {
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

	type LocalConfig = {
		[Property in keyof UserConfig]-?: UserConfig[Property];
	};

	type MessagesOptional = _MessagesOptional;
	type MessagesOptionalAny = _MessagesOptionalAny;
	type MessagesAny = _MessagesAny;
	type Messages = _Messages;

	type FormInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	interface Window {
		globalInputValidationNext: globalInputValidationNext;
	}
}

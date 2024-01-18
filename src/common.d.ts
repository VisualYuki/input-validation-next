export type ConfigRule = {
	required?: boolean;
	minLength?: number;
	[index?: string]: boolean | number | Array | string;
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

export type handlerThis = {
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

type FormInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type LocalConfig = {
	[Property in keyof UserConfig]-?: UserConfig[Property];
};

interface Window {
	globalInputValidationNext: globalInputValidationNext;
}

declare global {
	let globalInputValidationNext: globalInputValidationNext;
}

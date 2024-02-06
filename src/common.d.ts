//import type {globalInputValidationNext} from "./globInstance";

export interface ConfigRule {
	required?: any;
	minLength?: number;
	maxLength?: number;
	range?: [number, number];
	email?: any;
	url?: any;
	digits?: any;
	max?: number;
	min?: number;
	[index?: string]: ValidatorFunction | boolean | number | string | Array<number>;
}

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
	config: LocalConfig;
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

type ValidatorFunction = (value: any, params: any, element: HTMLElement) => boolean;

//interface Window {
//	globalInputValidationNext: globalInputValidationNext;
//}

//declare global {
//	let globalInputValidationNext: globalInputValidationNext;
//}

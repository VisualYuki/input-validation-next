import {type handlerThis} from "./common";
import {type Messages} from "./locale/messages_en";

export const defaultConfig: LocalConfig = {
	invalidHandler: () => {},
	submitHandler: () => {},
	debug: true,
	inputElementClass: "validation-input",
	inputElementErrorClass: "validation-input_error",
	inputElementSuccessClass: "validation-input_success",
	errorElementClass: "validation-error-label",
	errorElementTag: "p",
	onSubmitFocusInvalid: true,
	rules: {},
	messages: {},
	enableDefaultValidationForm: false,
	disableFormSubmitEvent: false,
};

export type ValidatorFunction = (value: any, params: any, element: HTMLElement) => boolean;

export type UserConfig = Partial<Config>;

//TODO: why undefined index signature.
export interface ConfigRule {
	required?: any;
	minLength?: number;
	maxLength?: number | ValidatorFunction;
	range?: [number, number];
	email?: any;
	url?: any;
	digits?: any;
	max?: number;
	min?: number;
	[index: string]: ValidatorFunction | boolean | number | string | Array<number> | undefined;
}

export type Config = {
	submitHandler: (this: handlerThis, event: SubmitEvent) => void;
	invalidHandler: (this: handlerThis, event: SubmitEvent) => void;
	rules: {
		[index: string | number]: ConfigRule;
	};
	messages: {
		[index: string | number]: Messages;
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
	//onFocusCleanup: boolean;
};

export type LocalConfig = Config;

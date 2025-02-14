import {MessagesOptionalAny, type handlerThis} from "./common";
import type {Rules} from "./rules";

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

export type ValidatorFunction = (
	value: any,
	params: any,
	element: HTMLElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
) => boolean;

export type UserConfig = Partial<Config>;

export type ConfigRule = {
	[index: string]: ValidatorFunction | boolean | number | string | Array<number> | undefined;
} & Rules;

export type Config = {
	submitHandler: (this: handlerThis, event: SubmitEvent) => void;
	invalidHandler: (this: handlerThis, event: SubmitEvent) => void;
	rules: {
		[index: string | number]: ConfigRule;
	};
	messages: {
		[index: string | number]: {
			//[index: string]: string,
			[prop in keyof MessagesOptionalAny]: string;
			//[index: string]: string
		};
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

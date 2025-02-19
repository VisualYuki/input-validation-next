import {LocalConfig} from "./config";
import {type EnumRules} from "./rules";

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

export type Messages = {
	[prop in EnumRules]: string;
};

export type MessagesOptional = {
	[Property in keyof Messages]?: Messages[Property];
};

//export type AnyMessages = Messages & {[index: string]: any};

export type OptionalAnyMessages = MessagesOptional & {[index: string]: string};

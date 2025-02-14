import {EnumRules} from "./rules";

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
//export type Messages = typeof messages_en;

export type MessagesAny = Messages & {[index: string]: any};
export type MessagesOptionalAny = MessagesOptional & {[index: string]: string};

import {TMessages, messages_en} from "./localization/messages_en";

//type validatorFunction = (
//	value: number | string | boolean,
//	params: number | boolean | Array<number>,
//	element: HTMLElement
//) => {};

type validatorFunction = (value: any, params: any, element: HTMLElement) => {};

export abstract class GlobalInputValidationNext {
	static validators: Map<string, {validator: validatorFunction; errorText: string; index: number}> = new Map();
	static messages: Map<string, string> = new Map();
	private static index: number = 0;

	/**
	 * Add global custom validator.
	 */
	static addValidator(name: string, validator: validatorFunction, errorText: string) {
		this.validators.set(name, {validator, errorText, index: this.index});
		this.index++;

		if (errorText) {
			this.messages.set(name, errorText);
		}
	}

	/**
	 * Set default or custom validator messages
	 */
	static setValidatorMessages(validatorMessages: TMessages) {
		for (let prop in validatorMessages) {
			this.messages.set(prop, validatorMessages[prop as keyof TMessages]);
		}
	}
}

GlobalInputValidationNext.setValidatorMessages(messages_en);

export default GlobalInputValidationNext;

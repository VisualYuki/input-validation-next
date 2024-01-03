import {messages_en} from "./localization/messages_en";

type TValidatorFunction = (value: any, params: any, element: HTMLElement) => boolean;

export abstract class GlobalInputValidationNext {
	static validators: Map<string, {validator: TValidatorFunction; errorText: string; index: number}> = new Map();
	static messages: Map<string, string> = new Map();
	private static index: number = 0;

	/**
	 * Add global custom validator.
	 */
	static addValidator(name: string, validator: TValidatorFunction, errorText: string) {
		this.validators.set(name, {validator, errorText, index: this.index});
		this.index++;

		if (errorText) {
			this.messages.set(name, errorText);
		}
	}

	/**
	 * Set default or custom validator messages
	 */
	static setValidatorMessages(validatorMessages: Messages) {
		for (let prop in validatorMessages) {
			this.messages.set(prop, validatorMessages[prop]);
		}
	}
}

GlobalInputValidationNext.setValidatorMessages(messages_en);

export default GlobalInputValidationNext;

import {messages_en} from "./localization/messages_en";

type ValidatorFunction = (value: any, params: any, element: HTMLElement) => boolean;

export abstract class GlobalInputValidationNext {
	static validators: Map<string, {validator: ValidatorFunction; errorText: string; index: number}> = new Map();
	static messages: Map<string, string> = new Map();
	private static index: number = 0;

	/**
	 * Add global custom validator.
	 */
	static addRule(name: string, validator: ValidatorFunction, errorText: string) {
		this.validators.set(name, {validator, errorText, index: this.index});
		this.index++;

		if (errorText) {
			this.messages.set(name, errorText);
		}
	}

	/**
	 * Set default or custom validator messages
	 */
	static setRuleMessages(validatorMessages: TMessages) {
		for (let prop in validatorMessages) {
			this.messages.set(prop, validatorMessages[prop]);
		}
	}
}

GlobalInputValidationNext.setRuleMessages(messages_en);

export default GlobalInputValidationNext;

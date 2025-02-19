import {type ValidatorFunction} from "./config";
import {messages_en} from "./locale/messages_en";
import {type Messages} from "./common";

class GlobalInputValidationNext {
	public validators: Map<string, {validator: ValidatorFunction; errorText: string; index: number}> = new Map();
	public messages: Map<string, string> = new Map();
	public index: number = 1;

	/**
	 * Add global custom validator.
	 */
	public addRule(name: string, validator: ValidatorFunction, errorText: string) {
		this.validators.set(name, {validator, errorText, index: this.index});
		this.index++;

		if (errorText) {
			this.messages.set(name, errorText);
		}
	}

	/**
	 * Set default or custom validator messages
	 */
	public setRuleMessages(validatorMessages: Messages) {
		for (const prop in validatorMessages) {
			this.messages.set(prop, validatorMessages[prop as keyof typeof validatorMessages]);
		}
	}
}

const globalInputValidationNext = new GlobalInputValidationNext();

globalInputValidationNext.setRuleMessages(messages_en);

export default globalInputValidationNext;

export type globalInputValidationNext = typeof globalInputValidationNext;

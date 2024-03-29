import {InputWrap} from "./InputWrap";
import type {ConfigRule, FormInput, LocalConfig, handlerThis} from "./common";
import {MessagesOptional, MessagesOptionalAny} from "./localization/messages_en";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: InputWrap[] = [];
	private mergedConfig: LocalConfig;
	private submitButton: HTMLInputElement | HTMLButtonElement | null;

	constructor(formElement: HTMLFormElement, mergedConfig: LocalConfig) {
		this.formElement = formElement;
		this.mergedConfig = mergedConfig;
		this.submitButton = this.formElement.querySelector("input[type='submit'], button[type='submit']");
		this.init();
	}

	submitEventCallback = (event: SubmitEvent) => {
		if (this.mergedConfig.disableFormSubmitEvent) {
			event.preventDefault();
			event.stopImmediatePropagation();
		}

		const createCallbackConfig: () => handlerThis = () => {
			return {
				config: {
					...this.mergedConfig,
				},
				formElement: this.formElement,
				submitButton: this.submitButton,
				inputList: this.inputs.map((inputWrap) => {
					return inputWrap.inputNode;
				}),
				successList: this.inputs
					.filter((inputWrap) => inputWrap.isValid)
					.map((inputWrap) => {
						return inputWrap.inputNode;
					}),
				errorList: this.inputs
					.filter((inputWrap) => !inputWrap.isValid)
					.map((inputWrap) => {
						return {
							element: inputWrap.inputNode,
							message: inputWrap.invalidRuleMessage,
							rule: inputWrap.invalidRule,
						};
					}),
			};
		};

		const isCorrectForm = this.validate();

		if (isCorrectForm) {
			this.mergedConfig.submitHandler?.call(createCallbackConfig(), event);
		} else {
			this.mergedConfig.invalidHandler?.call(createCallbackConfig(), event);
			event.preventDefault();
		}

		if (this.mergedConfig.disableFormSubmitEvent) {
			return;
		}
	};

	private init() {
		// Create inputWrap from form
		this.formElement.querySelectorAll<FormInput>("select, input, textarea").forEach((input) => {
			let inputWrap = new InputWrap(input, this.mergedConfig);

			if (inputWrap.needValidation) {
				this.inputs.push(inputWrap);
			}
		});

		// On submit form event, validate all inputs
		this.formElement.addEventListener("submit", this.submitEventCallback);

		// Add novalidate form attr
		if (this.mergedConfig.enableDefaultValidationForm) {
			this.formElement.removeAttribute("novalidate");
		} else {
			this.formElement.setAttribute("novalidate", "");
		}
	}

	validate(showErrors: boolean = true) {
		let isCorrectForm = true;

		this.inputs.forEach((inputWrap) => {
			let inputValidationCorrect = inputWrap.validate(showErrors);

			if (!inputValidationCorrect) {
				isCorrectForm = false;
			}
		});

		if (!isCorrectForm && this.mergedConfig.onSubmitFocusInvalid && showErrors) {
			(this.formElement.querySelector("." + this.mergedConfig.inputElementErrorClass) as HTMLElement).focus();
		}

		return isCorrectForm;
	}

	removeRules(
		input: FormInput,
		// eslint-disable-next-line @typescript-eslint/ban-types
		rules?: Array<keyof MessagesOptionalAny | (string & {})>
	) {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].inputNode === input) {
				this.inputs[i].removeRules(rules);
				break;
			}
		}
	}

	addRules(
		input: FormInput,
		config: {
			rules?: ConfigRule;
			messages?: MessagesOptional;
		}
	) {
		//let isThere = false;

		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].inputNode === input) {
				this.inputs[i].addRules(config);
				//isThere = true;
				break;
			}
		}

		//if (!isThere) {
		//	let inputWrap = new InputWrap(input, this.mergedConfig);

		//	this.inputs.push(inputWrap);
		//	inputWrap.addRules(config);
		//}
	}

	destroy() {
		this.inputs.forEach((element) => {
			element.destroy();
		});

		this.formElement.removeEventListener("submit", this.submitEventCallback);
	}
}

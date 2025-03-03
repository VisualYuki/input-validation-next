import {InputWrap} from "./input-wrap";
import type {FormInput, handlerThis} from "./common";
import type {MessagesOptional, OptionalAnyMessages} from "./common";
import type {ConfigRule, LocalConfig} from "./config";

export class FormWrap {
	formNode: HTMLFormElement;
	inputs: InputWrap[] = [];
	mergedConfig: LocalConfig;
	submitButton: HTMLInputElement | HTMLButtonElement | null;

	constructor(formNode: HTMLFormElement, mergedConfig: LocalConfig) {
		this.formNode = formNode;
		this.mergedConfig = mergedConfig;
		this.submitButton = this.formNode.querySelector("input[type='submit'], button[type='submit']");
		this.init();
	}

	private init() {
		// process inputs inside form
		this.formNode.querySelectorAll<FormInput>("select, input, textarea").forEach((input) => {
			const inputWrap = new InputWrap(input, this.formNode, this.mergedConfig);

			if (inputWrap.needValidation) {
				this.inputs.push(inputWrap);
			}
		});

		// On submit form event, validate all inputs
		this.formNode.addEventListener("submit", this.submitEventCallback);

		// Add novalidate form attr
		if (this.mergedConfig.enableDefaultValidationForm) {
			this.formNode.removeAttribute("novalidate");
		} else {
			this.formNode.setAttribute("novalidate", "");
		}
	}

	//TODO: make tests for this
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
				formElement: this.formNode,
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

	validate(showErrors: boolean = true) {
		let isCorrectForm = true;

		this.inputs.forEach((inputWrap) => {
			const inputValidationCorrect = inputWrap.validate(showErrors);

			if (!inputValidationCorrect) {
				isCorrectForm = false;
			}
		});

		if (!isCorrectForm && this.mergedConfig.onSubmitFocusInvalid && showErrors) {
			(this.formNode.querySelector("." + this.mergedConfig.inputElementErrorClass) as HTMLElement).focus();
		}

		return isCorrectForm;
	}

	removeRules(input: FormInput, rules?: Array<keyof OptionalAnyMessages>) {
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
		this.inputs.forEach((item) => {
			item.destroy();
		});

		this.formNode.removeEventListener("submit", this.submitEventCallback);
	}
}

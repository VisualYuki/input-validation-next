import {FormWrap} from "./FormWrap";

/**
 * Public class for user.
 */
class Init {
	private formWrap!: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: Config = {}) {
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	validate() {
		this.formWrap.validate();
	}
}

export function init(formElement: HTMLFormElement, userConfig: Config = {}) {
	if (!(formElement instanceof HTMLFormElement)) {
		console.warn(`root parameter is not form`);
		console.warn("root parameter: ", formElement);
		return null;
	}

	return new Init(formElement, userConfig);
}

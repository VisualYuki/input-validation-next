import {FormWrap} from "./FormWrap";

/**
 * Public class for user.
 */
export class Init {
	private formWrap!: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: Config = {}) {
		function checkParams() {
			if (!(formElement instanceof HTMLFormElement)) {
				console.warn(`root parameter is not form`);
				console.warn("root parameter: ", formElement);
				return;
			}
		}

		checkParams();
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	validate() {
		this.formWrap.validate();
	}
}

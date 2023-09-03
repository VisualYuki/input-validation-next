export abstract class GlobalInputValidationNext {
	private static validators: Map<String, {validator: Function; errorText: string}> = new Map();

	static addValidator(name: string, validator: Function, errorText: string) {
		this.validators.set(name, {validator, errorText});
	}

	static getValidators() {
		return this.validators;
	}
}

export default GlobalInputValidationNext;

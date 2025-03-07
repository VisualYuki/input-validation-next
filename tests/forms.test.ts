import {describe, expect, test, vi} from "vitest";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();
import {defaultConfig} from "../src/config";
import {findInput, getFileContent, initPlugin, isThereError} from "./utils";
import {InputValidationNext} from "@/index";
import {getSelectorName} from "@/utils";

function getErrorText(input: HTMLElement) {
	return input.parentElement?.querySelector("." + defaultConfig.errorElementClass)?.textContent;
}

describe("dublicated init", () => {
	test("", () => {
		document.body.innerHTML = getFileContent(`./form-1.html`);
		const inputWrapInstance1 = InputValidationNext(document.getElementById("form-1"), {});

		const inputWrapInstance2 = InputValidationNext(document.getElementById("form-1"), {});

		expect(inputWrapInstance1).toBe(inputWrapInstance2);
	});
});

describe("form-1", () => {
	test("rule order: requied, min-length, custom rule", async () => {
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any) {
				return value === "qwe123";
			},
			"qwe123"
		);

		const pluginInstance = initPlugin("form-1", {
			rules: {
				defaultAttrInput: {
					customRule: true,
				},
			},
		});

		const input = findInput("defaultAttrInput");

		pluginInstance?.validate();
		expect(getErrorText(input)).toBe("This field is required.");

		await user.type(input, "q");
		expect(getErrorText(input)).toBe("Please enter at least 4 characters.");

		await user.type(input, "we12");
		expect(getErrorText(input)).toBe("qwe123");

		await user.type(input, "3");
		expect(isThereError(input)).toBe(false);
	});

	test("custom error message in config", async () => {
		const pluginInstance = initPlugin("form-1", {
			rules: {
				defaultInput: {
					required: true,
					minLength: 4,
				},
			},
			messages: {
				defaultAttrInput: {
					required: "Required custom message for defaultAttrInput input",
				},
				defaultInput: {
					required: "Required custom message from message field of init",
					minLength: "minLegnth custom rule error text",
				},
			},
		});

		const input = findInput("defaultInput");
		pluginInstance?.validate();

		expect(getErrorText(input)).toBe("Required custom message from message field of init");

		await user.type(input, "123");
		pluginInstance?.validate();
		expect(isThereError(input)).toBe(true);
		expect(getErrorText(input)).toBe("minLegnth custom rule error text");

		await user.type(input, "4");
		pluginInstance?.validate();
		expect(isThereError(input)).toBe(false);

		const input2 = findInput("defaultAttrInput");
		expect(getErrorText(input2)).toBe("Required custom message for defaultAttrInput input");
	});

	test("customize classes", async () => {
		const pluginInstance = initPlugin("form-1", {
			errorElementClass: "errorElementClass",
			errorElementTag: "label",
			inputElementClass: "inputElementClass",
			inputElementErrorClass: "inputElementErrorClass",
			inputElementSuccessClass: "inputElementSuccessClass",
		});

		pluginInstance?.validate();
		const input = findInput("requiredInput");
		const errorNode = input.parentElement?.querySelector(".errorElementClass");

		expect(errorNode).toBeTruthy();
		expect(errorNode?.tagName).toBe("LABEL");
		expect(input.classList.contains("inputElementClass")).toBe(true);
		expect(input.classList.contains("inputElementErrorClass")).toBe(true);
		expect(input.classList.contains("inputElementSuccessClass")).toBe(false);

		await user.type(input, "12");
		expect(input.classList.contains("inputElementClass")).toBe(true);
		expect(input.classList.contains("inputElementErrorClass")).toBe(false);
		expect(input.classList.contains("inputElementSuccessClass")).toBe(true);
		expect(input.parentElement?.querySelector(".errorElementClass")).toBeNull();
	});
});

describe("form-2", () => {
	test("rules, config", async () => {
		function _invalidHandler() {}
		function _submitHandler() {}
		const invalidHandler = vi.fn(_invalidHandler);
		const submitHandler = vi.fn(_submitHandler);

		const pluginInstance = initPlugin("form-2", {
			invalidHandler: invalidHandler,
			submitHandler: submitHandler,
			rules: {
				textarea: {
					range: [5, 15],
				},
			},
		});

		const input = findInput("requiredInput2");

		pluginInstance?.addRules(input, {
			rules: {
				minLength: 4,
			},
			messages: {
				minLength: "custom error",
			},
		});

		expect(pluginInstance?.isValidForm()).toBe(false);
		expect(getErrorText(input)).toBeFalsy();

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();

		await user.type(input, "1");
		expect(getErrorText(input)).toBe("custom error");
		await user.type(input, "234");
		expect(isThereError(input)).toBe(false);

		const input2 = findInput("dropdownSelect");
		pluginInstance?.removeRules(input2, ["required"]);

		const input3 = findInput("checkboxInput");
		pluginInstance?.removeRules(input3);

		const input4 = findInput("textarea");
		await user.type(input4, "1");
		expect(isThereError(input4)).toBe(true);
		await user.type(input4, "5");
		expect(isThereError(input4)).toBe(false);

		const input5 = findInput("radio-input");
		input5.click();

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();
		expect(pluginInstance?.isValidForm()).toBe(true);

		expect(invalidHandler).toHaveReturned();
		expect(submitHandler).toHaveReturned();
	});
});

describe("form-3", () => {
	test("disableFormSubmitEvent: true", async () => {
		initPlugin("form-3", {
			disableFormSubmitEvent: true,
		});
		const formNode = document.getElementById("form-3") as HTMLFormElement;

		const submitSpy = vi.fn(() => {
			console.log("submit");
		});

		expect(submitSpy).not.toHaveBeenCalled();
		formNode.addEventListener("submit", submitSpy);
		(formNode.querySelector("button") as HTMLButtonElement).click();
		expect(submitSpy).not.toHaveBeenCalled();
	});

	test("disableFormSubmitEvent: false", async () => {
		initPlugin("form-3", {
			disableFormSubmitEvent: false,
		});
		const formNode = document.getElementById("form-3") as HTMLFormElement;

		const submitSpy = vi.fn(() => {
			console.log("submit");
		});

		expect(submitSpy).not.toHaveBeenCalled();
		formNode.addEventListener("submit", submitSpy);
		(formNode.querySelector("button") as HTMLButtonElement).click();
		expect(submitSpy).toHaveBeenCalled();
	});
});

describe("full covarage", () => {
	test("only for results", async () => {
		const pluginInstance = initPlugin("form-2", {
			enableDefaultValidationForm: true,
			//@ts-ignore
			submitHandler: 12,
			//@ts-ignore
			rules: "no object",
			//@ts-ignore
			messages: "no object",
			//@ts-ignore
			debug: 12,
			//@ts-ignore
			inputElementClass: 12,
			"invalid prop config": "1212",
		});

		const input = findInput("requiredInput2");

		pluginInstance?.removeRules(input, ["dfdf"]);

		pluginInstance?.destroy();
	});

	test("only for results", async () => {
		initPlugin("form-2", {
			rules: {
				"no name input": {
					required: true,
				},
			},
			messages: {
				"no name input 2": {
					required: "fdgdfg",
				},
			},
		});
	});

	test("inline custom rule", async () => {
		const form2 = initPlugin("form-2", {
			rules: {
				requiredInput2: {
					custom: (value: string) => {
						return value === "qwe123";
					},
				},
			},
			messages: {
				requiredInput2: {
					custom: "custom error message for inline rule",
				},
			},
		});

		const input = findInput("requiredInput2");

		await user.type(input, "qwe12");

		expect(isThereError(input)).toBe(true);

		expect(getErrorText(input)).toBe("custom error message for inline rule");

		await user.type(input, "3");

		form2?.validate();

		expect(isThereError(input)).toBe(false);
	});
});

describe("multiply forms", () => {
	test("", () => {
		document.body.innerHTML = getFileContent(`./multiply-forms.html`);
		const pluginInstance1 = InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {});
		const pluginInstance2 = InputValidationNext(document.getElementById("form-2") as HTMLFormElement, {});

		const form1Input = pluginInstance1?.formWrap.formNode.querySelector(
			getSelectorName("input-1")
		) as HTMLInputElement;
		const form2Input = pluginInstance2?.formWrap.formNode.querySelector(
			getSelectorName("input-1")
		) as HTMLInputElement;

		pluginInstance1?.validate();

		expect(isThereError(form1Input)).toBe(true);
		expect(isThereError(form2Input)).toBe(false);

		pluginInstance2?.validate();
		form1Input.value = "1";
		pluginInstance1?.validate();

		expect(isThereError(form1Input)).toBe(false);
		expect(isThereError(form2Input)).toBe(true);

		form2Input.value = "1";
		pluginInstance2?.validate();
		expect(isThereError(form1Input)).toBe(false);
		expect(isThereError(form2Input)).toBe(false);
	});
});

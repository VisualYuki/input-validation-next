import {afterEach, describe, expect, test} from "vitest";
import {InputWrap} from "../src/input-wrap";
import {defaultConfig, UserConfig} from "../src/config";
import deepmerge from "deepmerge";
import "../src/rules";
import {getFileContent, isThereError} from "./utils";
import userEvent from "@testing-library/user-event";

import {fireEvent} from "@testing-library/dom";

const user = userEvent.setup();

document.body.innerHTML = getFileContent("./examples.html");

describe("input-wrap", () => {
	const formNode = document.body.querySelector("form") as HTMLFormElement;

	afterEach(() => {
		(document.getElementById("text-input-3") as HTMLInputElement).value = "";
	});

	test("init with default attrs", () => {
		const inputNode = document.getElementById("text-input") as HTMLInputElement;
		const inputWrapInstance = new InputWrap(inputNode, formNode, defaultConfig);

		expect(inputWrapInstance.configRules).toEqual({required: true, minLength: 1, maxLength: 2});
		expect(inputWrapInstance.ruleNames).toEqual(["required", "minLength", "maxLength"]);
	});

	test("init with default attrs, custom rules", () => {
		const inputNode = document.getElementById("text-input-2") as HTMLInputElement;

		function containPoint(value: string) {
			return value.includes(".");
		}

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["text-input-2"]: {
					digits: true,
					required: true,
					maxLength: 2,
					containPoint,
				},
			},
		} as UserConfig);

		const inputWrapInstance = new InputWrap(inputNode, formNode, localDefaultConfig);

		expect(inputWrapInstance.configRules).toEqual({
			required: true,
			minLength: 1,
			maxLength: 2,
			digits: true,
			containPoint,
		});
		expect(inputWrapInstance.ruleNames).toEqual(["required", "minLength", "maxLength", "digits", "containPoint"]);
	});

	test("validate", async () => {
		const inputNode = document.getElementById("text-input-3") as HTMLInputElement;

		inputNode.value = "";

		function containPoint(value: string) {
			return value.includes(".");
		}

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["text-input-3"]: {
					required: true,
					minLength: 2,
					maxLength: 4,
					containPoint,
				},
			},
			messages: {
				["text-input-3"]: {
					containPoint: "the text must contain point",
				},
			},
		} as UserConfig);

		const inputWrapInstance = new InputWrap(inputNode, formNode, localDefaultConfig);

		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("required");
		expect(inputWrapInstance.errorNode.textContent).toBe("This field is required.");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementErrorClass);

		await user.type(inputNode, "1");
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("minLength");
		expect(inputWrapInstance.errorNode.textContent).toBe("Please enter at least 2 characters.");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementErrorClass);

		await user.type(inputNode, "2");
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("containPoint");
		expect(inputWrapInstance.errorNode.textContent).toBe("the text must contain point");

		await user.type(inputNode, "...");
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("maxLength");
		expect(inputWrapInstance.errorNode.textContent).toBe("Please enter max 4 characters.");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementErrorClass);

		//TODO: how simply
		await user.clear(inputNode);
		await user.type(inputNode, "12..");
		expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("");
		expect(inputWrapInstance.invalidRuleMessage).toBe("");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementSuccessClass);
		expect(inputWrapInstance.errorNode.textContent).toBe("");

		await user.type(inputNode, ".");
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("maxLength");
		expect(inputWrapInstance.errorNode.textContent).toBe("Please enter max 4 characters.");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementErrorClass);

		await user.clear(inputNode);
		await user.type(inputNode, "12..");
		expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("");
		expect(inputWrapInstance.invalidRuleMessage).toBe("");
		expect(inputWrapInstance.inputNode.classList).toContain(defaultConfig.inputElementSuccessClass);
		expect(inputWrapInstance.errorNode.textContent).toBe("");

		inputWrapInstance.destroy();
	});

	test("override config", async () => {
		const inputNode = document.getElementById("text-input-3") as HTMLInputElement;

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["text-input-3"]: {
					minLength: 3,
					digits: () => {
						return true;
					},
				},
			},
			messages: {
				["text-input-3"]: {
					minLength: "minLength custom text",
				},
			},
			errorElementClass: "custom-error-element-class",
			errorElementTag: "span",
			inputElementSuccessClass: "custom-input-element-success-class",
			inputElementErrorClass: "custom-input-element-error-class",
		} as UserConfig);

		const inputWrapInstance = new InputWrap(inputNode, formNode, localDefaultConfig);

		await user.type(inputNode, "gg");
		//expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("minLength");
		expect(inputWrapInstance.errorNode.textContent).toBe("minLength custom text");
		expect(inputWrapInstance.errorNode.classList).toContain("custom-error-element-class");
		expect(inputWrapInstance.inputNode.classList).toContain("custom-input-element-error-class");
		expect(inputWrapInstance.errorNode.nodeName.toLowerCase()).toBe("span");

		await user.type(inputNode, "g");
		//expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("");
		expect(inputWrapInstance.errorNode.textContent).toBe("");
		expect(inputWrapInstance.inputNode.classList).toContain("custom-input-element-success-class");
	});

	test("addRules, removeRules", async () => {
		const inputNode = document.getElementById("text-input-3") as HTMLInputElement;

		inputNode.value = "";

		function containPoint(value: string) {
			return value.includes(".");
		}

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["text-input-3"]: {
					url: true,
				},
			},
		} as UserConfig);

		const inputWrapInstance = new InputWrap(inputNode, formNode, localDefaultConfig);

		inputWrapInstance.removeRules(["url"]);

		inputWrapInstance.addRules({
			rules: {
				minLength: 3,
				containPoint,
			},
			messages: {
				minLength: "custom minLength text",
				containPoint: "text must contain point",
			},
		});

		inputNode.value = "12";
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("minLength");
		expect(inputWrapInstance.errorNode.textContent).toBe("custom minLength text");

		inputNode.value = "123";
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("containPoint");
		expect(inputWrapInstance.errorNode.textContent).toBe("text must contain point");

		inputNode.value = "123.";
		expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("");
		expect(inputWrapInstance.errorNode.textContent).toBe("");
	});

	test("validate after focusout", async () => {
		const inputNode = document.getElementById("text-input-3") as HTMLInputElement;

		inputNode.value = "";

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["text-input-3"]: {
					required: true,
				},
			},
		} as UserConfig);

		const inputWrapInstance = new InputWrap(inputNode, formNode, localDefaultConfig);

		expect(isThereError(inputNode)).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("");

		fireEvent(inputNode, new Event("focusout"));
		expect(isThereError(inputNode)).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("required");

		inputNode.value = "1";
		fireEvent(inputNode, new Event("focusout"));
		expect(isThereError(inputNode)).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("");
	});

	test("equalTo rule", () => {
		const comparedNode1 = document.getElementById("password-input-1") as HTMLInputElement;
		const comparedNode2 = document.getElementById("password-input-2") as HTMLInputElement;

		comparedNode1.value = "123";

		const localDefaultConfig = deepmerge(defaultConfig, {
			rules: {
				["password-input-1"]: {
					equalTo: "#password-input-2",
				},
			},
		} as UserConfig);

		const inputWrapInstance = new InputWrap(comparedNode1, formNode, localDefaultConfig);

		comparedNode2.value = "12";
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.invalidRule).toBe("equalTo");
		expect(inputWrapInstance.invalidRuleMessage).toBe("Please enter the same value again.");

		comparedNode2.value = "123";
		expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.invalidRule).toBe("");
		expect(inputWrapInstance.invalidRuleMessage).toBe("");
	});
});

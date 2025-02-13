import {describe, expect, test, vi} from "vitest";
import {InputWrap} from "../src/input-wrap";
import {type Config, defaultConfig, UserConfig} from "../src/config";
import deepmerge from "deepmerge";
import "../src/rules";

const INPUT_NAME = "input-name";
const localDefaultConfig = deepmerge(
	{
		rules: {
			[INPUT_NAME]: {
				required: true,
				minLength: 2,
				maxLength: (value, params) => {
					console.log("custom maxLength");
					return value.length <= params;
				},
			},
		},
	} as UserConfig,
	defaultConfig
);

describe("input-wrap", async () => {
	let inputNode = document.createElement("input");
	inputNode.name = INPUT_NAME;

	inputNode.required = true;
	//inputNode.minLength = 2;
	inputNode.setAttribute("max-length", "4");
	//inputNode.maxLength = 4;

	test("init", async () => {
		const inputWrapInstance = new InputWrap(inputNode, localDefaultConfig);

		expect(inputWrapInstance.inputName).toBe(INPUT_NAME);
		expect(inputWrapInstance.inputNode).toBe(inputNode);
		expect(inputWrapInstance.configRules).toEqual({required: true, minLength: 2, maxLength: 4});
	});
});

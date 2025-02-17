import fs from "fs";
import path from "path";
import {InputValidationNext} from "../src/index";
import {defaultConfig, UserConfig} from "@/config";
import {getSelectorName} from "@/utils";
import {InputWrap} from "@/input-wrap";
import deepmerge from "deepmerge";

export function getFileContent(relPath: string) {
	return fs.readFileSync(path.join(__dirname, relPath), {encoding: "utf8"}).toString();
}

export function initPlugin(formId: string, config: UserConfig = {}) {
	document.body.innerHTML = getFileContent(`./${formId}.html`);
	let pluginInstance = InputValidationNext(document.getElementById(formId) as HTMLFormElement, config);

	return pluginInstance;
}

export function findInput(name: string) {
	return document.querySelector(getSelectorName(name)) as HTMLInputElement;
}

export function isThereError(input: HTMLElement) {
	return input.classList.contains(defaultConfig.inputElementErrorClass);
}

export function initInputWrap(input: string, config: UserConfig): [HTMLInputElement, InputWrap] {
	let inputNode = document.getElementById(input) as HTMLInputElement;
	const localDefaultConfig = deepmerge(defaultConfig, config as UserConfig);

	return [inputNode, new InputWrap(inputNode, localDefaultConfig)];
}

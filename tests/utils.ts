import fs from "fs";
import path from "path";
import {InputValidationNext} from "../src/index";
import {UserConfig} from "@/common";

export function getFileContent(relPath: string) {
	return fs.readFileSync(path.join(__dirname, relPath), {encoding: "utf8"}).toString();
}

export function initPlugin(formId: string, config: UserConfig = {}) {
	document.body.innerHTML = getFileContent("../demo/index.html");
	let pluginInstance = InputValidationNext(document.getElementById(formId) as HTMLFormElement, config);

	return pluginInstance;
}

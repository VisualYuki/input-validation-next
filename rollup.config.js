import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * @type {import('rollup').RollupOptions}
 */
const plugin = [];

const formats = ["iife", "es"];

fs.readdirSync("./src/locale").forEach((file) => {
	formats.forEach((_format) => {
		/**
		 * @type {import('rollup').RollupOptions}
		 */
		const item = {
			input: "./src/locale/" + file,
			output: {
				format: _format,
				file: `dist/locale/${path.parse(file).name}${_format === "iife" ? ".browser" : ".es"}.js`,
			},
			plugins: [
				typescript({
					tsconfig: "./tsconfig.locale.json",
				}),
			],
		};
		plugin.push(item);
	});
});

export default defineConfig(plugin);

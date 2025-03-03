import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";
import * as fs from "node:fs";
import * as path from "node:path";
//import * as process from "node:process";
import terser from "@rollup/plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupConfig = [];

const formats = ["iife", "es"];

fs.readdirSync("./src/locale").forEach((file) => {
	formats.forEach((_format) => {
		const fileName = path.parse(file).name;

		/**
		 * @type {import('rollup').RollupOptions}
		 */
		const item = {
			input: "./src/locale/" + file,
			output: {
				format: _format,
				file: `dist/locale/${fileName}.${_format === "iife" ? "browser" : "es"}.js`,
			},
			plugins: [
				typescript({
					tsconfig: "./tsconfig.rollup.json",
				}),
				terser(),
			],
			logLevel: "silent",
		};
		rollupConfig.push(item);
	});
});

export default defineConfig(rollupConfig);

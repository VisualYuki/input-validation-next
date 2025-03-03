import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const rollupConfig = [];

function addRollupConfig(format) {
	rollupConfig.push({
		input: "./src/index.ts",
		output: {
			format: format,
			file: `dist/input-validation-next.${format === "iife" ? "browser" : "es"}.js`,
		},
		plugins: [
			typescript({
				tsconfig: "./tsconfig.rollup.json",
			}),
			commonjs(),
			nodeResolve(),
			terser({}),
		],
	});
}

addRollupConfig("iife");
addRollupConfig("es");

export default defineConfig(rollupConfig);

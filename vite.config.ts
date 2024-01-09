import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
	root: "./src/demo",
	build: {
		lib: {
			entry: resolve(__dirname, "./src/index.ts"),
			name: "input-validation-next",
			fileName: "input-validation-next",
			formats: ["cjs", "es", "iife", "umd"],
		},
		outDir: resolve(__dirname, "dist"),
	},
});

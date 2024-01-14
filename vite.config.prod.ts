import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "./src/index.ts"),
			name: "inputValidationNext",
			fileName: "input-validation-next",
			formats: ["cjs", "es", "iife", "umd"],
		},
		outDir: resolve(__dirname, "dist"),
	},
});

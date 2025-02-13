import {defineConfig} from "vite";
import {resolve} from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "./src/index.ts"),
			name: "inputValidationNext",
			fileName: "input-validation-next",
			formats: ["es", "umd", "cjs", "iife"],
		},
		outDir: resolve(__dirname, "dist"),
	},
	plugins: [
		dts({
			exclude: ["demo", "test", "./src/localization/messages_ru.ts", "./src/appendStyles.ts"],
			outDir: "dist/types/",
			copyDtsFiles: true,
			include: ["src"],
			//rollupTypes: true,
			//insertTypesEntry: true,
		}),
	],
});

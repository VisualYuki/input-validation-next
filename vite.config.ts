import {defineConfig} from "vite";
import {resolve} from "path";
//import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "./src/index.ts"),
			name: "inputValidationNext",
			fileName: "input-validation-next",
			formats: ["es", "iife"],
		},
		outDir: resolve(__dirname, "dist"),
		minify: true,
	},
	assetsInclude: ["**/*.html"],

	// plugins: [
	// 	dts({
	// 		exclude: ["demo", "test"],
	// 		outDir: "dist/types/",
	// 		copyDtsFiles: true,
	// 		include: ["src", "./global.d.ts"],
	// 	}),
	// ],
});

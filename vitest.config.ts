import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		testTimeout: 3600000,
		coverage: {
			exclude: ["**/demo/**", "**/src/vite-env.d.ts"],
			include: ["**/src/**"],
		},
	},
});

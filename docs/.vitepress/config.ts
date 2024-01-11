import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "input-validation-next",
	description: "A VitePress Site",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: "Home", link: "/"},
			{text: "Examples", link: "/markdown-examples"},
		],

		sidebar: [
			{
				text: "Getting Started",
				link: "/getting-started",
				//items: [
				//	{text: "Markdown Examples", link: "/markdown-examples"},
				//	{text: "Runtime API Examples", link: "/api-examples"},
				//],
			},
		],

		socialLinks: [{icon: "github", link: "https://github.com/VisualYuki/input-validation-next"}],
	},
});

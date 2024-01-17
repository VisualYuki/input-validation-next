import {defineConfig} from "vitepress";
//--outDir ./docs/dist --base https://visualyuki.github.io/input-validation-next/docs/dist/
// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "input-validation-next",
	description: "A VitePress Site",
	ignoreDeadLinks: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: "Home", link: "/"},
			{text: "Examples", link: "/markdown-examples"},
		],

		sidebar: [
			{
				text: "Guide",
				link: "/guide",
				//items: [
				//	{text: "Getting-started", link: "/getting-started"},
				//	//{text: "Runtime API Examples", link: "/api-examples"},
				//],
			},
			{
				text: "Api",

				items: [
					{text: "Config", link: "/config"},
					{text: "GlobalInputValidationNext ", link: "/GlobalInputValidationNext "},
					{text: "InputValidationNext ", link: "/InputValidationNext "},
				],
			},
		],

		socialLinks: [{icon: "github", link: "https://github.com/VisualYuki/input-validation-next"}],
	},
});

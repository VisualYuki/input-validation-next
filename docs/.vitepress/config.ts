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
			// {text: "Examples", link: "/markdown-examples"},
		],

		sidebar: [
			{
				text: "Guide",
				link: "/guide",
			},
			{
				text: "Api",
				items: [
					{text: "Config", link: "/config"},
					//{text: "GlobalInputValidationNext ", link: "/globalInputValidationNext "},
					//{text: "InputValidationNext ", link: "/inputValidationNext "},
					{text: "Validators ", link: "/validators "},
				],
			},
		],

		socialLinks: [{icon: "github", link: "https://github.com/VisualYuki/input-validation-next"}],
	},
});

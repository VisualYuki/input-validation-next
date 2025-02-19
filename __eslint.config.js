/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		extends: [
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			//"plugin:@typescript-eslint/recommended-type-checked",
			//"plugin:@typescript-eslint/stylistic-type-checked",
		],
		parser: "@typescript-eslint/parser",
		plugins: ["@typescript-eslint"],
		root: true,

		ignores: ["./docs", "./dist", "./demo"],
		files: ["./src/*", "./src/*"],

		//ignorePatterns: ["temp"],
	},
];

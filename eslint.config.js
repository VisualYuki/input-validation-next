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
		rules: {
			"prefer-const": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
		//ignorePatterns: ["temp"],
	},
];

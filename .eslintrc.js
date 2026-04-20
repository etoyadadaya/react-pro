module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
			},
		},
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:eslint-comments/recommended',
	],
	rules: {
		semi: [2, 'always'],
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'\\.svg\\?react$',
					'^@/',
					'^@app/',
					'^@pages/',
					'^@features/',
					'^@widgets/',
					'^@shared/',
				],
			},
		],
	},
	overrides: [
		{
			files: ['vite.config.mjs'],
			rules: {
				'import/no-unresolved': 'off',
				'import/namespace': 'off',
				'import/default': 'off',
				'import/no-named-as-default': 'off',
				'import/no-named-as-default-member': 'off',
			},
		},
	],
};

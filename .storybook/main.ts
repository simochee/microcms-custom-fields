import type { StorybookConfig } from "@storybook/react-vite";

const { BASE_URL = "/" } = process.env;

const config: StorybookConfig = {
	stories: ["../src/**/*.@(mdx|stories.tsx)"],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],
	viteFinal: (config) => {
		config.base = BASE_URL;
		return config;
	},
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
};

export default config;

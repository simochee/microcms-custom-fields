import type { Meta, StoryObj } from "@storybook/react";
import { Editor } from ".";

const meta = {
	component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		path: "index.js",
		defaultLanguage: "javascript",
	},
};

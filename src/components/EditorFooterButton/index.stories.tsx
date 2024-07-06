import { CodeBracketIcon } from "@heroicons/react/16/solid";
import type { Meta, StoryObj } from "@storybook/react";
import { EditorFooterButton } from ".";

const meta = {
	component: EditorFooterButton,
} satisfies Meta<typeof EditorFooterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		icon: CodeBracketIcon,
		children: "TypeScript JSX",
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";

const meta = {
    title: "UI/Toggle",
    component: Toggle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {
        size: {
            control: "select",
            options: ["s", "m"],
        },
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * Size
 */
export const Size: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Toggle {...args} size="s" />
            <Toggle {...args} size="m" />
        </div>
    ),
};

/*
 * Color
 */
export const Color: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Toggle {...args} color="primary" />
            <Toggle {...args} color="secondary" />
        </div>
    ),
};

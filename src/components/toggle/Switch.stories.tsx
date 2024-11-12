import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta = {
    title: "UI/Switch",
    component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

//Switch size story

export const Size: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Switch {...args} size="s" />
            <Switch {...args} size="m" />
        </div>
    ),
};

/*
 * Color
 */
export const Color: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Switch {...args} color="primary" />
            <Switch {...args} color="secondary" />
        </div>
    ),
};

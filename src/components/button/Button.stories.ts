import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {
        intent: {
            control: "select",
            options: ["primary", "secondary"],
        },
        variant: {
            control: "select",
            options: ["fill", "dashed"],
        },
        size: {
            control: "select",
            options: ["s", "m", "l"],
        },
        fillOut: {
            control: "boolean",
        },
        onClick: { action: "clicked" },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        intent: "primary",
        label: "Button",
    },
};

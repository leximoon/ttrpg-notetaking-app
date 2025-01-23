import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
    title: "UI/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {
        intent: {
            control: "select",
            options: ["primary", "secondary"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Base Story
 */

export const Single: Story = {
    args: {
        intent: "primary",
    },
};

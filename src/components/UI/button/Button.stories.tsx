import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
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
        onClick: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Base Story
 */

export const Single: Story = {
    args: {
        label: "Button",
    },
};

//Button color Story

export const Intent: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Button {...args} intent="primary" label="Primary" />
            <Button {...args} intent="secondary" label="Secondary" />
        </div>
    ),
};

//Button form Story

export const Variants: Story = {
    render: (args) => (
        <div className="flex gap-4">
            <Button {...args} variant="fill" label="Fill" />
            <Button {...args} variant="dashed" label="Dashed" />
        </div>
    ),
};

//Button sizes Story

export const Sizes: Story = {
    render: (args) => (
        <div className="">
            <Button {...args} size="s" label="Small" className="mx-2" />
            <Button {...args} size="m" label="Small" className="mx-2" />
            <Button {...args} size="l" label="Small" className="mx-2" />
        </div>
    ),
};

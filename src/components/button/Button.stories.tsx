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
        fillOut: {
            control: "boolean",
        },
        onClick: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Single: Story = {
    args: {
        label: "Button",
    },
};

export const Intent: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="flex gap-4">
            <Button {...args} intent="primary" label="Primary" />
            <Button {...args} intent="secondary" label="Secondary" />
        </div>
    ),
};

export const Variants: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="flex gap-4">
            <Button {...args} variant="fill" label="Fill" />
            <Button {...args} variant="dashed" label="Dashed" />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="">
            <Button {...args} size="s" label="Small" className="mx-2" />
            <Button {...args} size="m" label="Small" className="mx-2" />
            <Button {...args} size="l" label="Small" className="mx-2" />
        </div>
    ),
};

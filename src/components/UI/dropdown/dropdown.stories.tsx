import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
    title: "UI/Dropdown",
    component: Dropdown,
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
type Story = StoryObj<typeof Dropdown>;

/**
 * Base Story
 */

export const Single: Story = {
    args: {
        buttonLabel: "Dropdown",
    },
};

//Dropdown color Story

export const Intent: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="flex gap-4">
            <Dropdown {...args} intent="primary" label="Primary" />
            <Dropdown {...args} intent="secondary" label="Secondary" />
        </div>
    ),
};

//Dropdown form Story

export const Variants: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="flex gap-4">
            <Dropdown {...args} variant="fill" label="Fill" />
            <Dropdown {...args} variant="dashed" label="Dashed" />
        </div>
    ),
};

//Dropdown sizes Story

export const Sizes: Story = {
    args: {
        fillOut: false,
    },
    render: (args) => (
        <div className="">
            <Dropdown {...args} size="s" label="Small" className="mx-2" />
            <Dropdown {...args} size="m" label="Small" className="mx-2" />
            <Dropdown {...args} size="l" label="Small" className="mx-2" />
        </div>
    ),
};

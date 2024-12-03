import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./formInput";

const meta = {
    title: "UI/Form/Form Input",
    component: FormInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {},
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

//Switch size story

export const Default: Story = {
    args: {},
};

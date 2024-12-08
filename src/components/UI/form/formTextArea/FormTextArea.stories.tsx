import type { Meta, StoryObj } from "@storybook/react";
import { FormTextArea } from "./formTextArea";

const meta = {
    title: "UI/Form/Form Text Area",
    component: FormTextArea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {},
} satisfies Meta<typeof FormTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

//Switch size story

export const Default: Story = {};

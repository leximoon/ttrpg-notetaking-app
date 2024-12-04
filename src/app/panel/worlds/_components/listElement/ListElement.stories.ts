import type { Meta, StoryObj } from "@storybook/react";
import { ListElement } from "./listElement";

const meta = {
    title: "Control Panel",
    component: ListElement,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ListElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { name: "List Element Name", description: "List Element Desc" },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./dialog";

const meta = {
    title: "UI/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

    argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

//Switch size story

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
        title: "Modal Title",
        children: (
            <>
                <p>testestsetse</p>
                <p>asdfasdf</p>
            </>
        ),
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';


const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    intent: {
        control: "select",
        options: ["primary", "secondary"] },
    size:   {
        control: "select",
        options: ["s", "m", "l"]
     },
    onClick: { action: "clicked"}
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    intent: "primary",
    label: 'Button'
  },
};

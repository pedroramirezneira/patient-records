import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./index";

const meta = {
  title: "UI/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "bold"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default text",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "This is small text",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "This is medium text",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "This is large text",
  },
};

export const Normal: Story = {
  args: {
    weight: "normal",
    children: "This is normal weight text",
  },
};

export const MediumWeight: Story = {
  args: {
    weight: "medium",
    children: "This is medium weight text",
  },
};

export const Bold: Story = {
  args: {
    weight: "bold",
    children: "This is bold text",
  },
};

export const LargeBold: Story = {
  args: {
    size: "lg",
    weight: "bold",
    children: "Large bold heading",
  },
};

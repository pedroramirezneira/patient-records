import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./index";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text" },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Click me",
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    children: "Visit Example.com",
  },
};

export const LongText: Story = {
  args: {
    href: "#",
    children:
      "This is a longer link text that demonstrates how the link component handles multiple words",
  },
};

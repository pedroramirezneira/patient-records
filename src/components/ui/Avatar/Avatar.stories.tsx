import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./index";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
  },
};

export const Female: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Female Avatar",
  },
};

export const Male: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "Male Avatar",
  },
};

export const WithError: Story = {
  args: {
    src: "https://invalid-url.com/image.jpg",
    alt: "Fallback Avatar",
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SearchBar } from "./index";

const meta = {
  title: "UI/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Search patients...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Search...",
    defaultValue: "John Doe",
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./index";
import { Text } from "../Text";

const meta = {
  title: "UI/Card",
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Text weight="bold">Card Title</Text>
        <Text>This is a simple card with some content.</Text>
      </div>
    ),
  },
};

export const WithExpandedContent: Story = {
  args: {
    children: (
      <div>
        <Text weight="bold">Expandable Card</Text>
        <Text>Click to expand</Text>
      </div>
    ),
    expandedContent: (
      <div>
        <Text weight="bold">Expanded Section</Text>
        <Text>
          This is the expanded content that appears when you click the card.
        </Text>
      </div>
    ),
  },
};

export const InitiallyExpanded: Story = {
  args: {
    children: (
      <div>
        <Text weight="bold">Initially Expanded</Text>
        <Text>This card starts expanded</Text>
      </div>
    ),
    expandedContent: (
      <div>
        <Text>This content is visible from the start.</Text>
      </div>
    ),
    initialExpanded: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Modal } from "./index";
import { Text } from "../Text";
import { Input } from "../Input";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: { onClose: fn() },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Modal Title",
    children: (
      <div>
        <Text>This is the modal content.</Text>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    title: "Edit Information",
    children: (
      <div className="flex flex-col gap-4">
        <Input label="Name" placeholder="Enter name" />
        <Input label="Email" type="email" placeholder="Enter email" />
        <Input label="Description" placeholder="Enter description" />
      </div>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    children: (
      <div>
        <Text size="lg" weight="bold">
          Custom Header
        </Text>
        <Text>Modal without a title prop, using custom content instead.</Text>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Long Content Modal",
    children: (
      <div className="flex flex-col gap-4">
        <Text>
          This modal demonstrates scrolling behavior with lots of content.
        </Text>
        {Array.from({ length: 20 }).map((_, i) => (
          <Text key={i}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Text>
        ))}
      </div>
    ),
  },
};

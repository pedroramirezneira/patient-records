import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Textarea } from "./index";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Bio",
    placeholder: "Enter your bio",
    defaultValue: "This is a pre-filled textarea with some content.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    placeholder: "This is disabled",
    disabled: true,
    defaultValue: "This textarea is disabled",
  },
};

export const LongContent: Story = {
  args: {
    label: "Medical History",
    defaultValue:
      "Patient has a long medical history that includes multiple chronic conditions, regular medications, and frequent visits to various specialists. The description can be quite lengthy to provide comprehensive information about the patient's health status and treatment plan over the years.",
  },
};

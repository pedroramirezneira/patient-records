import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PatientCard } from "./index";
import type { Patient } from "../../types/patient";

const meta = {
  title: "Components/PatientCard",
  component: PatientCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  args: { onSave: fn() },
} satisfies Meta<typeof PatientCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPatient: Patient = {
  id: "1",
  name: "John Doe",
  description:
    "Regular patient since 2020. Has a history of diabetes and requires regular checkups.",
  avatar: "https://i.pravatar.cc/150?img=12",
  website: "https://johndoe.com",
  createdAt: "2020-03-15T00:00:00.000Z",
};

export const Default: Story = {
  args: {
    patient: mockPatient,
  },
};

export const WithoutWebsite: Story = {
  args: {
    patient: {
      ...mockPatient,
      website: undefined,
    },
  },
};

export const LongName: Story = {
  args: {
    patient: {
      ...mockPatient,
      name: "Dr. Christopher Wellington Montgomery III",
    },
  },
};

export const LongDescription: Story = {
  args: {
    patient: {
      ...mockPatient,
      description:
        "This patient has a very long medical history that includes multiple chronic conditions, regular medications, and frequent visits to various specialists. The description can be quite lengthy to provide comprehensive information about the patient's health status and treatment plan.",
    },
  },
};

export const FemalePatient: Story = {
  args: {
    patient: {
      id: "2",
      name: "Jane Smith",
      description: "New patient requiring initial consultation.",
      avatar: "https://i.pravatar.cc/150?img=5",
      website: "https://janesmith.com",
      createdAt: "2024-01-20T00:00:00.000Z",
    },
  },
};

export const RecentPatient: Story = {
  args: {
    patient: {
      ...mockPatient,
      createdAt: new Date().toISOString(),
    },
  },
};

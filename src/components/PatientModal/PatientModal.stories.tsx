import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PatientModal } from "./index";
import type { Patient } from "../../types/patient";

const meta = {
  title: "Components/PatientModal",
  component: PatientModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onClose: fn(),
    onSave: fn(),
  },
} satisfies Meta<typeof PatientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPatient: Patient = {
  id: "1",
  name: "John Doe",
  description: "Regular patient since 2020. Has a history of diabetes.",
  avatar: "https://i.pravatar.cc/150?img=12",
  website: "https://johndoe.com",
  createdAt: "2020-03-15T00:00:00.000Z",
};

export const EditExistingPatient: Story = {
  args: {
    title: "Edit Patient",
    patient: mockPatient,
  },
};

export const CreateNewPatient: Story = {
  args: {
    title: "Create New Patient",
    patient: undefined,
  },
};

export const EmptyPatient: Story = {
  args: {
    title: "Add Patient",
    patient: {
      id: "",
      name: "",
      description: "",
      avatar: "",
      website: "",
      createdAt: new Date().toISOString(),
    },
  },
};

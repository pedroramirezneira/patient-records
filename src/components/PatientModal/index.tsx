import { cva, type VariantProps } from "class-variance-authority";
import { Modal } from "../ui/Modal";
import type { CreatePatientInput, Patient } from "../../types/patient";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const patientModalVariant = cva();

type PatientModalVariant = VariantProps<typeof patientModalVariant>;

export type PatientModalProps = PatientModalVariant & {
  title?: string;
  onClose: () => void;
  onSave?: (patient: Patient) => void;
  patient?: Patient;
  isEditing?: boolean;
};

export const PatientModal = ({
  onClose,
  onSave,
  patient,
  isEditing = false,
  ...props
}: PatientModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [errors, setErrors] = useState({
    name: false,
    website: false,
    description: false,
  });

  const validateForm = () => {
    const nameValue = nameRef.current?.value?.trim() || "";
    const websiteValue = websiteRef.current?.value?.trim() || "";
    const descriptionValue = descriptionRef.current?.value?.trim() || "";

    const newErrors = {
      name: nameValue === "",
      website: websiteValue === "",
      description: descriptionValue === "",
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.website && !newErrors.description;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    if (onSave) {
      const patientData: CreatePatientInput = {
        name: nameRef.current?.value?.trim() || "",
        website: websiteRef.current?.value?.trim() || "",
        description: descriptionRef.current?.value?.trim() || "",
      };

      const updatedPatient: Patient = {
        ...patient,
        ...patientData,
        id: patient?.id || uuid(),
        avatar: patient?.avatar || "",
        createdAt: patient?.createdAt || new Date().toISOString(),
      };

      onSave(updatedPatient);

      if (isEditing) {
        toast.success("Patient updated successfully!");
      } else {
        toast.success("Patient added successfully!");
      }
    }
    onClose();
  };

  return (
    <Modal
      title={"Edit Patient"}
      className={patientModalVariant()}
      onClose={onClose}
      {...props}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Input
            ref={nameRef}
            label="Name"
            placeholder="Patient Name"
            defaultValue={patient?.name}
            error={errors.name}
            errorMessage="Name is required"
          />
          <Input
            ref={websiteRef}
            label="Website"
            placeholder="Patient Website"
            defaultValue={patient?.website}
            error={errors.website}
            errorMessage="Website is required"
          />
          <Textarea
            ref={descriptionRef}
            label="Description"
            placeholder="Patient Description"
            defaultValue={patient?.description}
            error={errors.description}
            errorMessage="Description is required"
          />
        </div>
        <div className="flex gap-4 justify-end">
          <Button variant="outlined" onClick={onClose}>
            Discard
          </Button>
          <Button variant="filled" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

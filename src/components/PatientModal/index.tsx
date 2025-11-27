import { cva, type VariantProps } from "class-variance-authority";
import { Modal } from "../ui/Modal";
import type { Patient } from "../../types/patient";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

const patientModalVariant = cva();

type PatientModalVariant = VariantProps<typeof patientModalVariant>;

export type PatientModalProps = PatientModalVariant & {
  title?: string;
  onClose: () => void;
  onSave?: (patient: Patient) => void;
  patient?: Patient;
};

export const PatientModal = ({
  onClose,
  onSave,
  patient,
  ...props
}: PatientModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (onSave) {
      const updatedPatient: Patient = {
        ...patient,
        id: patient?.id || uuid(),
        name: nameRef.current?.value || patient?.name || "",
        website: websiteRef.current?.value || patient?.website || "",
        description:
          descriptionRef.current?.value || patient?.description || "",
        avatar: patient?.avatar || "",
        createdAt: patient?.createdAt || new Date().toISOString(),
      };
      onSave(updatedPatient);
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
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-4">
          <Input
            ref={nameRef}
            label="Name"
            placeholder="Patient Name"
            defaultValue={patient?.name}
          />
          <Input
            ref={websiteRef}
            label="Website"
            placeholder="Patient Website"
            defaultValue={patient?.website}
          />
          <Input
            ref={descriptionRef}
            label="Description"
            placeholder="Patient Description"
            defaultValue={patient?.description}
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

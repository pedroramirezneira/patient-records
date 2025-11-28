import { Edit2 } from "lucide-react";
import type { Patient } from "../../types/patient";
import { Avatar } from "../ui/Avatar";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Link } from "../ui/Link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PatientModal } from "../PatientModal";

export type PatientCardProps = {
  patient: Patient;
  onSave?: (updatedPatient: Patient) => void;
};

export const PatientCard = ({ patient, onSave }: PatientCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const date = new Date(patient.createdAt);
  const formattedDate = date.toLocaleDateString("es-AR");

  const MAX_DESCRIPTION_LENGTH = 150;
  const isLongDescription = patient.description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription =
    showFullDescription || !isLongDescription
      ? patient.description
      : patient.description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <PatientModal
            title="Edit Patient"
            onClose={() => setIsOpen(false)}
            onSave={onSave}
            patient={patient}
          ></PatientModal>
        )}
      </AnimatePresence>
      <Card
        expandedContent={
          <div className="flex flex-col text-left gap-2">
            <div className="flex justify-between items-center">
              <Link
                className="truncate"
                target="_blank"
                href={patient.website || "https://example.com"}
              >
                {patient.website || "https://example.com"}
              </Link>
              <Button
                variant={"ghost"}
                className="w-12 h-12 shrink-0"
                onClick={handleClick}
              >
                <Edit2 />
              </Button>
            </div>
            <Text>{displayDescription}</Text>
            {isLongDescription && (
              <Button
                variant="text"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDescription(!showFullDescription);
                }}
                className="self-center"
              >
                {showFullDescription ? "View less" : "View more"}
              </Button>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              className="shrink-0"
              src={patient.avatar}
              alt={patient.name}
            />
            <div className="flex flex-col overflow-hidden text-left">
              <Text weight={"medium"} className="truncate">
                {patient.name}
              </Text>
              <Text className="truncate">Since {formattedDate}</Text>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

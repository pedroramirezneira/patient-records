import { Edit2 } from "lucide-react";
import type { Patient } from "../../types/patient";
import { Avatar } from "../ui/Avatar";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Link } from "../ui/Link";
import { useState } from "react";

export type PatientCardProps = {
  patient: Patient;
};

export const PatientCard = ({ patient }: PatientCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const date = new Date(patient.createdAt);
  const formattedDate = date.toLocaleDateString("es-AR");
  return (
    <Card
      expandedContent={
        <div className="flex flex-col text-left gap-2">
          <div className="flex justify-between items-center">
            <Link target="_blank" href={patient.website || "example.com"}>
              {patient.website || "https://example.com"}
            </Link>
            <Button
              variant={"ghost"}
              className="w-12 h-12"
              onClick={handleClick}
            >
              <Edit2 />
            </Button>
          </div>
          <Text>{patient.description}</Text>
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
  );
};

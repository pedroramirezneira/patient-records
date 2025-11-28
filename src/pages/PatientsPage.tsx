import { usePatients } from "../hooks/use-patients";
import { PatientCard } from "../components/PatientCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { Button } from "../components/ui/Button";
import { PatientModal } from "../components/PatientModal";
import { AnimatePresence } from "framer-motion";
import type { Patient } from "../types/patient";
import { CardSkeleton } from "../components/ui/Card/CardSkeleton";

export const PatientsPage = () => {
  const {
    filtered,
    loading,
    error,
    updatePatient,
    addPatient,
    filterPatients,
  } = usePatients();
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterPatients(e.target.value);
  };

  const handleCreatePatient = (newPatient: Patient) => {
    addPatient(newPatient);
  };

  const emptyPatient: Patient = {
    id: "",
    name: "",
    website: "",
    description: "",
    avatar: "",
    createdAt: "",
  };

  return (
    <>
      {error && <p>Error loading patients: {error}</p>}
      <div className="p-8 flex flex-col gap-8">
        <img src={Logo} alt="Logo" className="w-56" />

        <div className="flex gap-4 items-center">
          <SearchBar onChange={handleChange} />
          <Button
            variant="filled"
            onClick={() => setIsCreatingPatient(true)}
            className="whitespace-nowrap"
          >
            Add Patient
          </Button>
        </div>

        <AnimatePresence>
          {isCreatingPatient && (
            <PatientModal
              patient={emptyPatient}
              onClose={() => setIsCreatingPatient(false)}
              onSave={handleCreatePatient}
              title="Create Patient"
              isEditing={false}
            />
          )}
        </AnimatePresence>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : (
            filtered.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSave={updatePatient}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

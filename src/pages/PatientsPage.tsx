import { Loader2 } from "lucide-react";
import { usePatients } from "../hooks/usePatients";
import { PatientCard } from "../components/PatientCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Button } from "../components/ui/Button";
import { PatientModal } from "../components/PatientModal";
import { AnimatePresence } from "framer-motion";
import type { Patient } from "../types/patient";

export const PatientsPage = () => {
  const { patients, loading, error, updatePatient, addPatient } = usePatients();
  const [filtered, setFiltered] = useState(patients);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

  useEffect(() => {
    setFiltered(patients);
  }, [patients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
    setFiltered(filteredPatients);
  };

  const handleCreatePatient = (newPatient: Patient) => {
    const patientWithId: Patient = {
      ...newPatient,
    };
    addPatient(patientWithId);
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
      {loading && (
        <div className="h-screen w-full flex m-0 p-0 items-center justify-center">
          <Loader2 size={48} className="animate-spin text-primary" />
        </div>
      )}
      {!loading && error && <p>Error loading patients: {error}</p>}
      {!loading && patients && (
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
              />
            )}
          </AnimatePresence>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
            {filtered.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSave={updatePatient}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

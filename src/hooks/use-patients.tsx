import { createContext, useContext, useEffect, useState } from "react";
import type { Patient } from "../types/patient";
import { getPatients } from "../lib/patientsService";

const STORAGE_KEY = "patient-records-local";

const getLocalPatients = (): Record<string, Patient> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveLocalPatient = (patient: Patient) => {
  const localPatients = getLocalPatients();
  localPatients[patient.id] = patient;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localPatients));
};

const mergeWithLocalStorage = (apiPatients: Patient[]): Patient[] => {
  const localPatients = getLocalPatients();
  const apiPatientIds = new Set(apiPatients.map((p) => p.id));

  // Merge API patients with local versions
  const mergedApiPatients = apiPatients.map((patient) =>
    localPatients[patient.id] ? localPatients[patient.id] : patient
  );

  // Add local-only patients (those not in API)
  const localOnlyPatients = Object.values(localPatients).filter(
    (patient) => !apiPatientIds.has(patient.id)
  );

  return [...mergedApiPatients, ...localOnlyPatients];
};

type PatientsContextType = {
  patients: Patient[];
  filtered: Patient[];
  loading: boolean;
  error: string | null;
  updatePatient: (patient: Patient) => void;
  addPatient: (patient: Patient) => void;
  filterPatients: (query: string) => void;
};

const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const PatientsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await getPatients();
        if (!("error" in result)) {
          const mergedPatients = mergeWithLocalStorage(result);
          setPatients(mergedPatients);
          setFiltered(mergedPatients);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const updatePatient = (updatedPatient: Patient) => {
    saveLocalPatient(updatedPatient);
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setFiltered((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  const addPatient = (newPatient: Patient) => {
    saveLocalPatient(newPatient);
    setPatients((prev) => [...prev, newPatient]);
    setFiltered((prev) => [...prev, newPatient]);
  };

  const filterPatients = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(lowerQuery)
    );
    setFiltered(filteredPatients);
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        filtered,
        loading,
        error,
        updatePatient,
        addPatient,
        filterPatients,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientsProvider");
  }
  return context;
};

import { useEffect, useState } from "react";
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

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await getPatients();
        if (!("error" in result)) {
          const mergedPatients = mergeWithLocalStorage(result);
          setPatients(mergedPatients);
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
  };

  const addPatient = (newPatient: Patient) => {
    saveLocalPatient(newPatient);
    setPatients((prev) => [...prev, newPatient]);
  };

  return { patients, loading, error, updatePatient, addPatient };
};

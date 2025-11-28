import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Patient } from "../types/patient";
import { getPatients } from "../lib/patientsService";

const STORAGE_KEY = "patient-records-local";
const LIMIT = 12;

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
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  updatePatient: (patient: Patient) => void;
  addPatient: (patient: Patient) => void;
  searchPatients: (query: string) => void;
  loadMore: () => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPatients = useCallback(
    async (pageNum: number, search: string, isLoadMore: boolean = false) => {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const result = await getPatients({
          page: pageNum,
          limit: LIMIT,
          search,
        });

        if (!("error" in result)) {
          const mergedPatients = mergeWithLocalStorage(result);

          if (isLoadMore) {
            setPatients((prev) => {
              const existingIds = new Set(prev.map((p) => p.id));
              const newPatients = mergedPatients.filter(
                (p) => !existingIds.has(p.id)
              );
              return [...prev, ...newPatients];
            });
          } else {
            setPatients(mergedPatients);
          }

          setHasMore(result.length === LIMIT);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPatients(1, "");
  }, [fetchPatients]);

  const updatePatient = (updatedPatient: Patient) => {
    saveLocalPatient(updatedPatient);
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  const addPatient = (newPatient: Patient) => {
    saveLocalPatient(newPatient);
    setPatients((prev) => [newPatient, ...prev]);
  };

  const searchPatients = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
    fetchPatients(1, query, false);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPatients(nextPage, searchQuery, true);
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        loading,
        loadingMore,
        error,
        updatePatient,
        addPatient,
        searchPatients,
        loadMore,
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

import { usePatients } from "../hooks/use-patients";
import { PatientCard } from "../components/PatientCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "../assets/logo.png";
import { Button } from "../components/ui/Button";
import { PatientModal } from "../components/PatientModal";
import { AnimatePresence } from "framer-motion";
import type { Patient } from "../types/patient";
import { CardSkeleton } from "../components/ui/Card/CardSkeleton";

export const PatientsPage = () => {
  const {
    patients,
    loading,
    loadingMore,
    error,
    updatePatient,
    addPatient,
    searchPatients,
    loadMore,
  } = usePatients();
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchPatients(value);
    }, 500);
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

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading && !loadingMore) {
        loadMore();
      }
    },
    [loading, loadingMore, loadMore]
  );

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Error loading patients: {error}
        </div>
      )}
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
          {loading && patients.length === 0 ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : (
            patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSave={updatePatient}
              />
            ))
          )}
        </div>
        <div ref={observerTarget} className="w-full h-px -mt-8" />
        {loadingMore && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={`loading-more-${index}`} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

import { Loader2 } from "lucide-react";
import { usePatients } from "../hooks/usePatients";
import { PatientCard } from "../components/PatientCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

export const PatientsPage = () => {
  const { patients, loading, error } = usePatients();
  const [filtered, setFiltered] = useState(patients);

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

          <SearchBar onChange={handleChange} />
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

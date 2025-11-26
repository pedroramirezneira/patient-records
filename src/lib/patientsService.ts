import type { Patient } from "../types/patient";
import { apiUrl } from "./api";

export type PatientResponse = Patient[] | { error: string };

export const getPatients: () => Promise<PatientResponse> = async () => {
  const response = await fetch(`${apiUrl}/users`);
  if (!response.ok) {
    return { error: "Failed to fetch patients" };
  }
  return response.json() as Promise<Patient[]>;
};

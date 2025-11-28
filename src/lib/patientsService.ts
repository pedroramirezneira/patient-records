import type { Patient } from "../types/patient";
import { apiUrl } from "./api";

export type PatientResponse = Patient[] | { error: string };

export type GetPatientsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const getPatients = async (
  params: GetPatientsParams = {}
): Promise<PatientResponse> => {
  const { page = 1, limit = 10, search = "" } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const response = await fetch(`${apiUrl}/users?${queryParams.toString()}`);
  if (!response.ok && response.status !== 404) {
    return { error: "Failed to fetch patients" };
  }
  if (response.status === 404) {
    return [];
  }
  return response.json() as Promise<Patient[]>;
};

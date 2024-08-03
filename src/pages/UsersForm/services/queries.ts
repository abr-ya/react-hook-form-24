import { useQuery } from "@tanstack/react-query";

import { Option } from "@/types/option";
import { usersApi } from "@/api/users";
import { SchemaType } from "../types/schema";
import { ApiGetUser } from "../types/contracts";
import { normalizeGetUser } from "./normalize";

const getStates = () => usersApi.get<Option[]>("states").then((res) => res.data);
const getLanguages = () => usersApi.get<Option[]>("languages").then((res) => res.data);
const getGenders = () => usersApi.get<Option[]>("genders").then((res) => res.data);
const getSkills = () => usersApi.get<Option[]>("skills").then((res) => res.data);
const getUsers = () =>
  usersApi.get<ApiGetUser[]>("users").then((res) =>
    res.data.map((user) => ({
      id: user.id.toString(),
      label: user.name,
    })),
  );

const getUser = async (id: string): Promise<SchemaType> => {
  const { data } = await usersApi.get<ApiGetUser>(`/users/${id}`);

  return normalizeGetUser(data);
};

export const useStates = () => useQuery({ queryKey: ["states"], queryFn: getStates });
export const useLanguages = () => useQuery({ queryKey: ["languages"], queryFn: getLanguages });
export const useGenders = () => useQuery({ queryKey: ["genders"], queryFn: getGenders });
export const useSkills = () => useQuery({ queryKey: ["skills"], queryFn: getSkills });
export const useUsers = () => useQuery({ queryKey: ["users"], queryFn: getUsers });
export const useUser = (id: string) =>
  useQuery({ queryKey: ["user", { id }], queryFn: () => getUser(id), enabled: !!id });

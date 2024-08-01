import { useQuery } from "@tanstack/react-query";

import { Option } from "@/types/option";
import { usersApi } from "@/api/users";
import { SchemaType } from "../types/schema";
import { ApiGet } from "../types/contracts";

const getStates = () => usersApi.get<Option[]>("states").then((res) => res.data);
const getLanguages = () => usersApi.get<Option[]>("languages").then((res) => res.data);
const getGenders = () => usersApi.get<Option[]>("genders").then((res) => res.data);
const getSkills = () => usersApi.get<Option[]>("skills").then((res) => res.data);

const getUser = async (id: string): Promise<SchemaType> => {
  const { data } = await usersApi.get<ApiGet>(`/users/${id}`);

  return {
    variant: "edit",
    id: data.id.toString(),
    name: data.name,
    email: data.email,
    employmentPeriod: [new Date(data.formerEmploymentPeriod[0]), new Date(data.formerEmploymentPeriod[1])],
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registerDateAndTime: new Date(data.registrationDateAndTime),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    students: data.students,
    isTeacher: data.isTeacher,
  };
};

export const useStates = () => useQuery({ queryKey: ["states"], queryFn: getStates });
export const useLanguages = () => useQuery({ queryKey: ["languages"], queryFn: getLanguages });
export const useGenders = () => useQuery({ queryKey: ["genders"], queryFn: getGenders });
export const useSkills = () => useQuery({ queryKey: ["skills"], queryFn: getSkills });

export const useUser = (id: string) =>
  useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

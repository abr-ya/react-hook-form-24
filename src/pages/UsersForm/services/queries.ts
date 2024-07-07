import { useQuery } from "@tanstack/react-query";

import { Option } from "@/types/option";
import { usersApi } from "@/api/users";

const getStates = () => usersApi.get<Option[]>("states").then((res) => res.data);
const getLanguages = () => usersApi.get<Option[]>("languages").then((res) => res.data);

export const useStates = () => useQuery({ queryKey: ["states"], queryFn: getStates });
export const useLanguages = () => useQuery({ queryKey: ["languages"], queryFn: getLanguages });

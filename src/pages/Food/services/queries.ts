import { useQuery } from "@tanstack/react-query";

import { foodApi } from "@/api/food";

// todo: dto!
const getIngredients = () => foodApi.get<unknown[]>("ingredients").then((res) => res.data);

export const useIngredients = () => useQuery({ queryKey: ["ingredients"], queryFn: getIngredients });

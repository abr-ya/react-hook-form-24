import { usersApi } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemaType } from "../types/schema";
import { normalizeSendUser } from "./normalize";

const queryClient = useQueryClient();

const createUserFn = (data: SchemaType) =>
  usersApi.post("users", normalizeSendUser(data)).then((res) => console.log(res));
const createUserSuccess = () =>
  queryClient.invalidateQueries({ queryKey: ["users"] }).then(() => alert("User created!"));

export const useCreateUser = () => useMutation({ mutationFn: createUserFn, onSuccess: createUserSuccess });

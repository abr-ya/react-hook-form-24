import { usersApi } from "@/api/users";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { SchemaType } from "../types/schema";
import { normalizeSendUser } from "./normalize";

const createUserFn = (data: SchemaType) => usersApi.post("users", normalizeSendUser(data)).then((r) => console.log(r));
const editUserFn = (data: SchemaType) => {
  // may be 'edit' only!
  if (data.variant === "edit")
    return usersApi.put(`users/${data.id}`, normalizeSendUser(data)).then((r) => console.log(r));
};

export const useCreateUser = (client: QueryClient) =>
  useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] }).then(() => alert("User created!"));
    },
  });

export const useEditUser = (client: QueryClient) =>
  useMutation({
    // as, because it's 100% edit!))
    mutationFn: editUserFn as (data: SchemaType) => Promise<void>,
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: ["users"] });
      if (variables.variant === "edit") {
        client.invalidateQueries({ queryKey: ["user", { id: variables.id }] });
      }
      alert("User edited!");
    },
  });

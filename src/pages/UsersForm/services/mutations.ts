import { usersApi } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemaType } from "../types/schema";
import { normalizeSendUser } from "./normalize";

const queryClient = useQueryClient();

// todo: try chaning style!
export const useCreateUser = () =>
  useMutation({
    mutationFn: async (data: SchemaType) => {
      await usersApi.post("users", normalizeSendUser(data)); // todo: not need 'variant' here?
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User created!");
    },
  });

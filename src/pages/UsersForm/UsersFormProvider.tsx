import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

import { defaultValues, schema, SchemaType } from "./types/schema";

import UsersForm from "./UsersForm";

const UsersFormProvider = () => {
  const formMethods = useForm<SchemaType>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...formMethods}>
      <UsersForm />
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};

export default UsersFormProvider;

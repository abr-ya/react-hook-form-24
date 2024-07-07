import { Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { RHFAutocomplete } from "@/components";
import { Option } from "@/types/option";
import { SchemaType } from "./types/schema";

const UsersForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<SchemaType>();

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
  };

  const tempOptions: Option[] = [
    { id: "chocolate", label: "Chocolate" },
    { id: "strawberry", label: "Strawberry" },
    { id: "vanilla", label: "Vanilla" },
  ];

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        Some Controls
        <Stack sx={{ gap: 2 }}>
          <TextField {...register("name")} label="Name" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register("email")} label="Email" error={!!errors.email} helperText={errors.email?.message} />
          <RHFAutocomplete<SchemaType> name="states" label="States" options={tempOptions} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default UsersForm;

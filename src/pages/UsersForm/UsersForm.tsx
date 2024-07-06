import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Stack, TextField } from "@mui/material";
import { schema, SchemaType } from "./types/schema";

const UsersForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SchemaType>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <TextField {...register("name")} label="Name" error={!!errors.name} helperText={errors.name?.message} />
        <TextField {...register("email")} label="Email" error={!!errors.email} helperText={errors.email?.message} />
      </Stack>
    </Container>
  );
};

export default UsersForm;

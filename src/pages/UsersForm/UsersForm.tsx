import { Container, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";

import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDateTimePicker,
  RHFRadioGroup,
  RHFSlider,
  RHFToggleButtonGroup,
} from "@/components";
import { SchemaType } from "./types/schema";
import { useGenders, useLanguages, useSkills, useStates } from "./services/queries";
import { RHFDateRangePicker } from "@/components/RHFDateRangePicker";

const UsersForm = () => {
  // get data from server
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<SchemaType>();

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        Some Controls
        <Stack sx={{ gap: 2 }}>
          <TextField {...register("name")} label="Name" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register("email")} label="Email" error={!!errors.email} helperText={errors.email?.message} />
          <RHFAutocomplete<SchemaType> name="states" label="States" options={statesQuery.data} />
          <RHFToggleButtonGroup<SchemaType> name="languagesSpoken" options={languagesQuery.data} />
          <RHFRadioGroup<SchemaType> name="gender" options={gendersQuery.data} label="Gender" />
          <RHFCheckbox<SchemaType> name="skills" options={skillsQuery.data} label="Skills" />
          <RHFDateTimePicker<SchemaType> name="registerDateAndTime" label="Registration Date & Time" />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<SchemaType> name="employmentPeriod" />
          <RHFSlider<SchemaType> name="salaryRange" label="Salary Range" min={500} max={10000} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default UsersForm;

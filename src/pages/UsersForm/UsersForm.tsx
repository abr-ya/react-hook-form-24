import { Fragment, useEffect } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { SubmitHandler, useFieldArray, useFormContext, useWatch } from "react-hook-form";

import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDateRangePicker,
  RHFDateTimePicker,
  RHFRadioGroup,
  RHFSlider,
  RHFSwitch,
  RHFTextField,
  RHFToggleButtonGroup,
} from "@/components";
import { defaultValues, SchemaType } from "./types/schema";
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from "./services/queries";
import { useCreateUser, useEditUser } from "./services/mutations";
import { useQueryClient } from "@tanstack/react-query";

const UsersForm = () => {
  // get data from server
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const { handleSubmit, control, reset, setValue, unregister } = useFormContext<SchemaType>();

  const id = useWatch({ control, name: "id" });
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const variant = useWatch({ control, name: "variant" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  // cleaning if not teacher
  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  const resetHandler = () => {
    reset(defaultValues);
  };

  const userClickHandler = (id: string) => {
    // console.log("click", id);
    setValue("id", id);
  };

  const userQuery = useUser(id);

  // update form data when new data received
  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const queryClient = useQueryClient();

  const createUserMutation = useCreateUser(queryClient);
  const editUserMutation = useEditUser(queryClient);

  const submitHandler: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(submitHandler)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map(({ id: userID, label }) => (
            <ListItem disablePadding key={userID}>
              <ListItemButton onClick={() => userClickHandler(userID)} selected={userID === id}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email" />
          <RHFAutocomplete<SchemaType> name="states" label="States" options={statesQuery.data} />
          <RHFToggleButtonGroup<SchemaType> name="languagesSpoken" options={languagesQuery.data} />
          <RHFRadioGroup<SchemaType> name="gender" options={gendersQuery.data} label="Gender" />
          <RHFCheckbox<SchemaType> name="skills" options={skillsQuery.data} label="Skills" />
          <RHFDateTimePicker<SchemaType> name="registerDateAndTime" label="Registration Date & Time" />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<SchemaType> name="employmentPeriod" />
          <RHFSlider<SchemaType> name="salaryRange" label="Salary Range" min={500} max={10000} />
          <RHFSwitch<SchemaType> name="isTeacher" label="Are you a teacher?" />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<SchemaType> name={`students.${index}.name`} label="Name" />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">
              {variant === "create" ? "Create" : "Update"} user
            </Button>
            <Button onClick={resetHandler}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default UsersForm;

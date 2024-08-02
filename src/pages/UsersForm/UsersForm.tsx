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

const UsersForm = () => {
  // get data from server
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  // todo: add watche for id
  const userQuery = useUser("2");

  const { handleSubmit, control, reset, unregister } = useFormContext<SchemaType>();

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
  };

  const isTeacher = useWatch({ control, name: "isTeacher" });

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

  const ResetHandler = () => {
    reset(defaultValues);
  };

  // temp
  console.log("user 2:", userQuery.data);

  const userClickHandler = () => {
    console.log("user click");
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              {/* todo: add id! */}
              <ListItemButton onClick={userClickHandler} selected={user.id === "2"}>
                <ListItemText primary={user.label} />
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
            <Button type="submit">New user</Button>
            <Button onClick={ResetHandler}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default UsersForm;

import { ApiGetUser } from "../types/contracts";
import { SchemaType } from "../types/schema";

export const normalizeUser: (apiUser: ApiGetUser) => SchemaType = (apiUser: ApiGetUser) => ({
  variant: "edit",
  id: apiUser.id.toString(),
  name: apiUser.name,
  email: apiUser.email,
  employmentPeriod: [new Date(apiUser.formerEmploymentPeriod[0]), new Date(apiUser.formerEmploymentPeriod[1])],
  gender: apiUser.gender,
  languagesSpoken: apiUser.languagesSpoken,
  registerDateAndTime: new Date(apiUser.registrationDateAndTime),
  salaryRange: [apiUser.salaryRange[0], apiUser.salaryRange[1]],
  skills: apiUser.skills,
  states: apiUser.states,
  students: apiUser.students,
  isTeacher: apiUser.isTeacher,
});

import { ApiCommon, ApiCreateEditUser, ApiGetUser } from "../types/contracts";
import { SchemaType } from "../types/schema";

export const normalizeGetUser: (apiUser: ApiGetUser) => SchemaType = (apiUser: ApiGetUser) => ({
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

export const normalizeSendUser = (data: SchemaType): ApiCreateEditUser => {
  const common: ApiCommon = {
    email: data.email,
    formerEmploymentPeriod: [data.employmentPeriod[0].toString(), data.employmentPeriod[1].toString()],
    name: data.name,
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registrationDateAndTime: data.registerDateAndTime.toString(),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, id: data.id, variant: data.variant };
    }
  }
};

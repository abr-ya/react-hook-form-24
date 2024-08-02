type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: number;
};

type ApiCommon = {
  email: string;
  name: string;
  states: string[];
  gender: string;
  languagesSpoken: string[];
  skills: string[];
  registrationDateAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: [number, number];
  isTeacher: boolean;
  students: {
    name: string;
  }[];
};

export type ApiCreateEditUser = ApiCommon & (Create | Edit);
export type ApiGetUser = ApiCommon & Edit;

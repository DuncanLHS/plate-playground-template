import { TemplateField } from "./types";

export const templateFields: Array<TemplateField> = [
  {
    label: "User Name",
    key: "user_name",
    path: "user.name",
    type: "string",
    isBlock: false,
  },
  {
    label: "User Email",
    key: "user_email",
    path: "user.email",
    type: "string",
    isBlock: false,
  },
  {
    label: "Products",
    key: "products",
    path: "products",
    type: "array",
    isBlock: true,
  },
];

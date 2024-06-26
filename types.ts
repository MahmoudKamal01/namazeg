import { HTMLInputTypeAttribute } from "react";

export type Option = {
  label: string;
  value: string;
};

export type formField = {
  name: string;
  placeholder: string;
  label: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  options?: Option[];
};
export type jsonForm = {
  title?: string;
  heading?: string;
  subheading?: string;
  fields?: formField[];
};

export interface form {
  background: string;
  createdAt: string;
  createdBy: string;
  enableSignIn?: boolean;
  id: number;
  jsonform: string;
  style: string;
  theme: string;
}

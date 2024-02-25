import { InputHTMLAttributes } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  rules?: any;
}

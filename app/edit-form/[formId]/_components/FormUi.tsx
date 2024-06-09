import { Input } from "@/components/ui/input";
import { jsonForm, Option } from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

type Props = {
  jsonForm: jsonForm;
  onFieldUpdate: any;
  deleteField: any;
  selectedTheme: string;
};

export default function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
}: Props) {
  return (
    <div
      className="border p-5 md:w-[600px] rounded-lg flex-col space-y-4"
      data-theme={selectedTheme}
    >
      <h2 className="font-bold text-center text-2xl">{jsonForm?.title}</h2>
      <h2 className="text-sm text-gray-400 text-center">{jsonForm?.heading}</h2>

      {jsonForm?.fields?.map((field, index) => (
        <div
          key={index}
          className="relative border border-dashed border-primary flex items-center justify-center p-4 rounded-md"
        >
          <div className="absolute top-0 right-0 m-2">
            <FieldEdit
              defaultValue={field}
              onUpdate={(value: any) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>

          {field.type === "select" ? (
            <div className="w-full bg-transparent">
              <label className="text-xs text-gray-500">{field.label}</label>
              <div className="my-3 placeholder-red-400">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options?.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : field.type === "radio" ? (
            <div className="w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <RadioGroup>
                {field.options?.map((option: Option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.label} />
                    <Label htmlFor={option.label}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.type === "checkbox" ? (
            <div className="my-3 w-full">
              {field.options ? (
                <div>
                  <h2>{field.label}</h2>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Checkbox />
                      <h2>{option.label}</h2>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                name={field?.name}
                placeholder={field.placeholder}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

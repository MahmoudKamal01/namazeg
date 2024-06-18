import { Input } from "@/components/ui/input";
import { jsonForm, Option } from "@/types";
import React, { useRef, useState } from "react";
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
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type Props = {
  jsonForm: jsonForm;
  onFieldUpdate: any;
  deleteField: any;
  selectedTheme: string;
  selectedBorderStyle: any;
  editable?: boolean;
  formId: any;
  enableSignIn?: boolean;
};

export default function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedBorderStyle,
  editable = true,
  formId = 0,
  enableSignIn = false,
}: Props) {
  type FormData = any;

  const [formData, setFormData] = useState<FormData>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const { user, isSignedIn } = useUser();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange: any = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format("FF/MM/yyyy"),
      formRef: formId,
    });

    if (result) {
      if (formRef.current) formRef?.current.reset();
      toast("Responses Submitted Successfully!");
    } else {
      toast("Error while saving your form!");
    }
    console.log(formData);
  };

  const handleCheckBoxChange = (
    fieldName: string,
    itemName: any,
    value: any
  ) => {
    const list: any = formData?.[fieldName] ? formData?.[fieldName] : [];
    console.log(fieldName, itemName, value);
    if (value) {
      list.push({ label: itemName, value });
      setFormData({ ...formData, [fieldName]: list });
    } else {
      const result = list.filter((item: any) => item.label == itemName);
      setFormData({ ...formData, [fieldName]: result });
    }
    console.log(formData);
  };
  return (
    <form
      ref={formRef}
      className={`border p-5 md:w-[600px] rounded-lg flex-col space-y-4 ${selectedBorderStyle}`}
      data-theme={selectedTheme}
      onSubmit={(e) => onFormSubmit(e)}
    >
      <h2 className="font-bold text-center text-2xl">{jsonForm?.title}</h2>
      <h2 className="text-sm text-gray-400 text-center">{jsonForm?.heading}</h2>

      {jsonForm?.fields?.map((field, index) => (
        <div
          key={index}
          className={`relative   flex items-center justify-center rounded-md ${
            editable ? "border border-dashed border-primary p-4" : ""
          }`}
        >
          {editable && (
            <div className="absolute top-0 right-0 m-2">
              <FieldEdit
                defaultValue={field}
                onUpdate={(value: any) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}

          {field.type === "select" ? (
            <div className="my-2 w-full bg-transparent">
              <label className="text-md text-gray-500">{field.label}</label>
              <div className=" placeholder-red-400">
                <Select
                  required={field?.required}
                  onValueChange={(v) => handleSelectChange(field.name, v)}
                >
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
            <div className="my-2 w-full">
              <label className="text-md text-gray-500">{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options?.map((option: Option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={option.label}
                      onClick={() =>
                        handleSelectChange(field.name, option.label)
                      }
                    />
                    <Label htmlFor={option.label}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.type === "checkbox" ? (
            <div className=" w-full">
              {field.options ? (
                <div>
                  <h2>{field.label}</h2>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Checkbox
                        required={field?.required}
                        onCheckedChange={(v) =>
                          handleCheckBoxChange(field?.label, field.label, v)
                        }
                      />
                      <h2>{option.label}</h2>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Checkbox onChange={(e) => console.log(e)} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-2 w-full">
              <label className="text-md text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                name={field?.name}
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(e)}
                required={field?.required}
              />
            </div>
          )}
        </div>
      ))}
      {!enableSignIn ? (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      ) : isSignedIn ? (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      ) : (
        <Button>
          <SignInButton mode="modal">Sign in before submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

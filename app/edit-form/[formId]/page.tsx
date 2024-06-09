"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import FormUi from "./_components/FormUi";
import { jsonForm } from "@/types";
import { toast } from "sonner";
import Controller from "./_components/Controller";

type Params = {
  formId: string;
};

type Props = { params: Params };

export default function EditForm({ params }: Props) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<jsonForm>({});
  const router = useRouter();
  const [record, setRecord] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const getFormData = useCallback(async () => {
    if (user) {
      const emailAddress = user.primaryEmailAddress?.emailAddress;
      if (emailAddress) {
        const result = await db
          .select()
          .from(JsonForms)
          .where(
            and(
              eq(JsonForms.id, parseInt(params.formId)),
              eq(JsonForms.createdBy, emailAddress)
            )
          );
        if (result.length > 0) {
          const parsedForm = JSON.parse(result[0].jsonform);
          setRecord(result[0]);
          setJsonForm(parsedForm);
        }
      } else {
        console.error("User email address is undefined");
      }
    }
  }, [user, params.formId]);

  useEffect(() => {
    getFormData();
  }, [getFormData]);

  const onFieldUpdate = (value: any, index: any) => {
    if (jsonForm.fields) {
      const updatedFields = [...jsonForm.fields];
      updatedFields[index] = { ...updatedFields[index], ...value };
      setJsonForm({ ...jsonForm, fields: updatedFields });
      updateJsonFormInDb({ ...jsonForm, fields: updatedFields });
    }
  };

  const updateJsonFormInDb = async (updatedJsonForm: jsonForm) => {
    const emailAddress = user?.primaryEmailAddress?.emailAddress;
    if (!emailAddress) {
      console.error("User email address is undefined");
      return;
    }
    await db
      .update(JsonForms)
      .set({ jsonform: JSON.stringify(updatedJsonForm) })
      .where(
        and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, emailAddress))
      );
    toast("Updated successfully ✅.");
  };

  const deleteField = (indexToRemove: any) => {
    const updatedFields = jsonForm.fields?.filter(
      (item, index) => index !== indexToRemove
    );
    const updatedJsonForm = { ...jsonForm, fields: updatedFields };
    setJsonForm(updatedJsonForm);
    updateJsonFormInDb(updatedJsonForm);
  };

  return (
    <div className="p-10">
      <h2
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller />
        </div>
        <div className="md:col-span-2 border rounded-lg p-5 min-h-screen flex items-center justify-center">
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index: any) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
}

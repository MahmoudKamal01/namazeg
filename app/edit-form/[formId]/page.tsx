"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import FormUi from "./_components/FormUi";
import { jsonForm } from "@/types";
import { toast } from "sonner";
import Controller from "./_components/Controller";
import { borderStyles } from "@/app/_data/BorderStyles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const [selectedBackground, setSelectedBackground] = useState("None");

  const [selectedBorderStyle, setSelectedBorderStyle] = useState(
    borderStyles.border
  );
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
          if (result[0].background)
            setSelectedBackground(result[0]?.background);
          if (result[0].theme) setSelectedTheme(result[0]?.theme);
          if (result[0].style) setSelectedBorderStyle(result[0]?.style);
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
      )
      .returning({ id: JsonForms.id });
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

  const updateControllerFields = async (value: any, columnName: string) => {
    const emailAddress = user?.primaryEmailAddress?.emailAddress;
    if (!emailAddress) {
      console.error("User email address is undefined");
      return;
    }
    if (!value || !columnName) {
      console.error("Controller field is passed undefined");
      return;
    }
    await db
      .update(JsonForms)
      .set({
        [columnName]: value,
      })
      .where(
        and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, emailAddress))
      )
      .returning({ id: JsonForms.id });
    toast("Updated successfully ✅.");
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          onClick={() => router.back()}
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        >
          <ArrowLeft />
          Back
        </h2>
        <div className="flex gap-2">
          <Link href={"/aiform/" + record?.id} target="_blank">
            <Button className="flex gap-2">
              <SquareArrowOutUpRight /> Live Preview
            </Button>
          </Link>

          <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
            <Share2 />
            Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
              setSelectedBackground(value);
            }}
            selectedBorderStyle={(value: any) => {
              updateControllerFields(value, "style");
              setSelectedBorderStyle(value);
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 min-h-screen flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index: any) => deleteField(index)}
            selectedBorderStyle={selectedBorderStyle}
          />
        </div>
      </div>
    </div>
  );
}

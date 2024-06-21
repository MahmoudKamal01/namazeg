"use client";
import React, { useState, useEffect } from "react";
import LogoIcon from "@/app/_components/LogoIcon";
import FormUi from "@/app/edit-form/[formId]/_components/FormUi";
import { db } from "@/configs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { form, jsonForm } from "@/types"; // Assuming these are relevant types
import { JsonForms } from "@/configs/schema";
import { Loader2 } from "lucide-react";

const DEFAULT_FORM_DATA = {
  id: 0,
  jsonform: "",
  createdBy: "",
  createdAt: "",
  theme: "",
  background: "",
  style: "",
  enableSignIn: false,
};

type Props = { params: { formid: number } };
function LiveAiForm({ params }: Props) {
  async function checkDatabaseConnection() {
    try {
      const forms = await db.select().from(JsonForms).limit(1);
      console.log("First form:", forms[0]);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Call the function to check the connection
  checkDatabaseConnection();

  const [record, setRecord] = useState<form>(DEFAULT_FORM_DATA);
  const [jsonForm, setJsonForm] = useState<jsonForm>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (params.formid) {
      getFormData();
    }
  }, [params.formid]);

  const getFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, 35));
      console.log(result[0]);
      if (result.length) {
        const parsedForm = JSON.parse(result[0].jsonform);
        setRecord({
          ...result[0],
          theme: result[0].theme ?? "",
          background: result[0].background ?? "",
          style: result[0].style ?? "",
          enableSignIn: result[0].enableSignIn ?? false,
        });
        setJsonForm(parsedForm);
      } else {
        throw new Error("Form not found");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      setError("An error occurred while fetching form data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="pt-40">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen relative"
      style={{ backgroundImage: record.background }}
    >
      <div className="my-8 mx-2 p-8">
        <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log("")}
          deleteField={() => console.log("")}
          selectedBorderStyle={record.style}
          selectedTheme={record.theme}
          editable={false}
          formId={record.id}
          enableSignIn={record.enableSignIn}
        />
      </div>
      <div className="bottom-0 absolute w-full flex items-center justify-center mt-20 text-sm md:text-lg">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 bg-black text-white px-3"
        >
          <LogoIcon color="white" height={50} width={50} />
          <div className="text-center">
            Namazeg: build your AI form in seconds!
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LiveAiForm;

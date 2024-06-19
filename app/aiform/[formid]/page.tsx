"use client";
import Logo from "@/app/_components/Logo";
import LogoIcon from "@/app/_components/LogoIcon";
import FormUi from "@/app/edit-form/[formId]/_components/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { jsonForm } from "@/types";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

type Props = { params: any };

export default function LiveAiForm({ params }: Props) {
  console.log("para", params);
  const [record, setRecord] = useState<any>(null);
  const [jsonForm, setJsonForm] = useState<jsonForm>({});
  useEffect(() => {
    params && getFormData();
  }, [params]);

  const getFormData = useCallback(async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, parseInt(params.formid)));
    if (result.length > 0) {
      const parsedForm = JSON.parse(result[0].jsonform);
      setRecord(result[0]);
      setJsonForm(parsedForm);
      console.log(record);
    }
  }, [params.formid]);
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen border-none relative"
      style={{ backgroundImage: record?.background }}
    >
      <div className="mt-8">
        {record && (
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={() => console.log("")}
            deleteField={() => console.log("")}
            selectedBorderStyle={record?.style}
            selectedTheme={record?.theme}
            editable={false}
            formId={record.id}
            enableSignIn={record?.enableSignIn}
          />
        )}
      </div>
      <div className="bottom-0 absolute w-full flex items-center justify-center mt-20">
        <Link
          className="flex items-center justify-center gap-2 bg-black text-white px-3  w-full"
          href="/"
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

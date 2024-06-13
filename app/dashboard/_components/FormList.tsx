"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";
import { form } from "@/types";

type Props = {};

export default function FormList({}: Props) {
  const { user } = useUser();
  const [formList, setFormList] = useState<any>([]);
  useEffect(() => {
    user && GetFormList();
  }, [user]);
  const emailAddress = user?.primaryEmailAddress?.emailAddress;

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, emailAddress!))
      .orderBy(desc(JsonForms.id));
    setFormList(result);
    console.log(result);
  };

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {formList.map((form: form) => (
        <div key={form?.id} className="bg-white shadow-md rounded-md p-4">
          <FormListItem form={form} refreshData={GetFormList} />
        </div>
      ))}
    </div>
  );
}

"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

type Props = {};

export default function FormList({}: Props) {
  let GetFormList: any;
  const { user } = useUser();
  const [formList, setFormList] = useState<any>([]);
  useEffect(() => {
    user && GetFormList();
  }, [user]);
  if (user) {
    const emailAddress = user.primaryEmailAddress?.emailAddress;

    if (emailAddress) {
      GetFormList = async () => {
        const result = await db
          .select()
          .from(JsonForms)
          .where(eq(JsonForms.createdBy, emailAddress))
          .orderBy(desc(JsonForms.id));
        setFormList(result);
        console.log(result);
      };
    }
  }
  return (
    <div className="mt-5">
      {formList.map((form: any, index: any) => {
        <div></div>;
      })}
    </div>
  );
}

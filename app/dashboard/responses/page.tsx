"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResponseItem from "./_components/ResponseItem";

type Props = {};

export default function Responses({}: Props) {
  const { user } = useUser();
  const [responses, setResponses] = useState<any>();
  useEffect(() => {
    user && getFormList();
  }, [user]);

  const getFormList = async () => {
    const result: any = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress!));

    setResponses(result);
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-center">
        Responses
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {responses && responses.length > 0 ? (
          responses.map((response: any) => (
            <div key={response.id}>
              <ResponseItem
                formRecord={response}
                jsonForm={JSON.parse(response.jsonform)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            There are no responses currently.
          </p>
        )}
      </div>
    </div>
  );
}

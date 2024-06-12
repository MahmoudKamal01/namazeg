import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Share, Trash } from "lucide-react";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { userResponses } from "@/configs/schema";
import { db } from "@/configs";
import { eq } from "drizzle-orm";
type Props = { jsonForm: any; formRecord: any };

export default function ResponseItem({ jsonForm, formRecord }: Props) {
  const [loading, setLoading] = useState();

  const ExportData = async () => {
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    console.log(result);
  };

  return (
    <div>
      <div className="border shadow-sm rounded-lg p-4 w-full flex flex-col justify-between">
        <h2 className="font-semibold text-lg text-black truncate">
          {jsonForm?.title || "Untitled form"}
        </h2>
        <h2 className="text-sm text-gray-500 truncate">
          {jsonForm?.heading || "no description"}
        </h2>
        <hr className="my-4"></hr>
        <div className="flex justify-between items-center">
          <h2 className="text-sm">
            <strong>45</strong> Responses
          </h2>
          <Button onClick={() => ExportData()} className="" size="sm">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

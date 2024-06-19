import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userResponses } from "@/configs/schema";
import { db } from "@/configs";
import { eq } from "drizzle-orm";
import * as XLSX from "xlsx";

type Props = { jsonForm: any; formRecord: any };

export default function ResponseItem({ jsonForm, formRecord }: Props) {
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState<number | null>(null);

  const ExportData = async () => {
    let jsonData: any = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    console.log(result);
    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
      setResponseCount(jsonData.length);
    }
    console.log(jsonData);
    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData: any) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      jsonForm.title + ".xlsx" || "form responses" + ".xlsx"
    );
  };

  useEffect(() => {
    // Fetch initial response count when the component mounts
    const fetchInitialResponseCount = async () => {
      setLoading(true);
      const result = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));

      if (result) {
        setResponseCount(result.length);
      }
      setLoading(false);
    };

    fetchInitialResponseCount();
  }, [formRecord.id]);

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
            {loading ? "Loading..." : <strong>{responseCount}</strong>}{" "}
            Responses
          </h2>
          <Button
            onClick={() => ExportData()}
            disabled={loading}
            className=""
            size="sm"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Export"}
          </Button>
        </div>
      </div>
    </div>
  );
}

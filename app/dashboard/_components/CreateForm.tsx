"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema"; // Ensure this path is correct
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
type Props = {};

const PROMPT = `, On the basis of description please give form
in json format with form title, form heading, form subheading with form having Form 
field, form name, placeholder name, fieldType, field, field label required In Json format , follow theses schemas:
formField = {
  name: string;
  placeholder: string;
  label: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  options?: Option[];
}
jsonForm = {
  title?: string;
  heading?: string;
  subheading?: string;
  fields?: formField[];
}`;

export default function CreateForm({}: Props) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const route = useRouter();
  const onCreateForm = async () => {
    console.log(userInput);
    setLoading(true);

    try {
      const result = await AiChatSession.sendMessage(
        "Description:" + userInput + PROMPT
      );
      const jsonResponse = await result.response.text();
      console.log(jsonResponse);

      if (jsonResponse) {
        const resp = await db
          .insert(JsonForms)
          .values({
            jsonform: jsonResponse,
            createdBy: user?.primaryEmailAddress?.emailAddress || "",
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: JsonForms.id });
        console.log("New Form Id", resp[0].id);
        if (resp[0].id) {
          route.push("/edit-form/" + resp[0].id);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write description of your form ✨"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button disabled={loading} onClick={onCreateForm}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

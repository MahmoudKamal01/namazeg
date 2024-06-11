import { Button } from "@/components/ui/button";
import { form } from "@/types";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
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
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

type Props = { form: form; refreshData: any };

export default function FormListItem({ form, refreshData }: Props) {
  const jsonForm = JSON.parse(form?.jsonform);
  const { user } = useUser();
  let onDeleteForm: any;
  if (user) {
    const emailAddress = user.primaryEmailAddress?.emailAddress;

    if (emailAddress) {
      onDeleteForm = async () => {
        const result = await db
          .delete(JsonForms)
          .where(
            and(
              eq(JsonForms.id, form.id),
              eq(JsonForms.createdBy, emailAddress)
            )
          );

        if (result) {
          toast("Form has been deleted successfully!");
          refreshData();
        }
      };
    }
  }

  return (
    <div className="border shadow-sm rounded-lg p-4 w-full flex flex-col justify-between">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="h-5 w-5 cursor-pointer hover:scale-105 transition-all text-red-600" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="font-semibold text-lg text-black truncate">
        {jsonForm?.title || "Untitled form"}
      </h2>
      <h2 className="text-sm text-gray-500 truncate">
        {jsonForm?.heading || "no description"}
      </h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between space-x-4">
        <div>
          <RWebShare
            data={{
              text:
                jsonForm?.heading +
                " , Build your form in seconds with Namazeg!",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + form?.id,
              title: jsonForm?.title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button
              variant="outline"
              size={"sm"}
              className="flex items-center space-x-2"
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </RWebShare>
        </div>

        <Link href={"/edit-form/" + form?.id}>
          <Button size={"sm"} className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <span>Edit</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

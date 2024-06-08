import { Delete, Edit, Trash } from "lucide-react";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

import { Input } from "@/components/ui/input";
import { formField } from "@/types";
import { Button } from "@/components/ui/button";
type Props = { defaultValue: formField; onUpdate: any; deleteField: any };

export default function FieldEdit({
  defaultValue,
  onUpdate,
  deleteField,
}: Props) {
  const [label, setLabel] = useState<string>(defaultValue?.label);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>(
    defaultValue?.placeholder
  );
  return (
    <div className="flex gap-2 items-center justify-center w-full h-full">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Edit
            className="h-5 w-5 text-gray-500"
            onClick={() => setIsPopoverOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className="text-xs">Label name</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs">Placeholder name</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            className="mt-3"
            size="sm"
            onClick={() => {
              onUpdate({ label, placeholder });
              setIsPopoverOpen(false);
            }}
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="h-5 w-5 text-red-500" />
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
            <AlertDialogAction onClick={() => deleteField()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

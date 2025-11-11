/*
Dialog - A UI Overlay that asks the user to input some data

Purpose - Create the dialog and handle when we submit or make a change

add the content within the component

Asynchronous means:
“Don’t wait — keep going, and I’ll come back to this when it’s ready

*/
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import React, { type FormEvent } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import api from "@/lib/api";
import type { ChangeEvent } from "react";
/*
We use onCreated so its a callback function so we can return the created question back to parent so the whole page doesnt need to be refreshed
 */

//
interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  author: { name: string };
  votes: number;
  answers: any[];
}
type CreateQuestionDialogProps = {
  onCreated?: (question: Question) => void;
};

const CreateQuestionDialog: React.FC<CreateQuestionDialogProps> = ({
  onCreated,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  //   HandleChange and handleSubmit for the Dialog needs to go here
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const myData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(","),
      };
      //   Error Handling
      if (!myData.title || !myData.content || !myData.tags) {
        setError("All fields are required");
      }
      //API Call to create the question
      const response = await api.post("/question", myData);
      const data = response.data;
      onCreated?.(data); // push new question into UI - parent component.
      setFormData({ title: "", content: "", tags: "" });
      setOpen(false); // close the dialog
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create question");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {/* asChild treats the trigger as the child element within it */}
        <Button
          variant="outline"
          className="bg-blue-500 rounded-xl text-white font-bold hover:shadow-md hover:bg-blue-100"
        >
          Create Question
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 min-w-full bg-blackA6 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed left-[58%] top-[25%] w-[60%] -translate-x-1/2 rounded-2xl shadow-xl focus:outline-none bg-white pb-10">
          {/* Contains the header and the form to fill out */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Dialog.Title className="text-2xl font-bold">
              Ask a Question
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 px-6">
            <div className="flex flex-col mt-5">
              <label className="text-xl font-bold pb-2 text-gray-900">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="How do I solve..."
                className=" outline-black outline-1 font-semibold pt-2 pb-2 pl-2 border-[1px] rounded-xl border-gray-700 min-w-[400px]"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-lg pb-2 font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                rows={5}
                className="w-full max-h-[100px] border rounded-xl pt-2 pb-2 pl-2 overflow-hidden  outline-black outline-1 text-lg border-gray-700"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <input
                name="tags"
                placeholder="comma separated"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateQuestionDialog;

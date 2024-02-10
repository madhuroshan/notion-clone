"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((res) => {
      router.push(`/documents/${res}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Created a new note",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/empty.png"
        width={300}
        height={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        width={300}
        height={300}
        alt="Empty"
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Rotion
      </h2>

      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};

export default DocumentsPage;

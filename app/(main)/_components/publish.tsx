"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published note",
      error: "Failed to publish note",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Unpublished note",
      error: "Failed to unpublish note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 h-4 w-4 ml-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 " align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-sky-500 animate-pulse ">
              <Globe className="h-4 w-4" />
              <p>This note is live on web</p>
            </div>
            <div className="flex items-center ">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate "
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none "
              >
                {copied ? (
                  <Check className="h-4 2-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div>
              <Button
                size="sm"
                className="w-ful text-xs "
                disabled={isSubmitting}
                onClick={onUnPublish}
              >
                Unpublish
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p>Publish this note</p>

            <span className="text-xs text-muted-foreground mb-4">
              Share your work with the world
            </span>

            <Button
              onClick={onPublish}
              disabled={isSubmitting}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

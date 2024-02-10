"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/error.png"
        alt="Error"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        alt="Error"
        width={300}
        height={300}
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Something went wrong. Please try again later.
      </h2>

      <Button asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;

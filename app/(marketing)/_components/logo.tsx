import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { RocketIcon } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-2">
      <RocketIcon className="h-6 w-6" />
      <p className={cn("font-semibold", font.className)}>Rotion</p>
    </div>
  );
};

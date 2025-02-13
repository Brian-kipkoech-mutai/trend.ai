import { GalleryVerticalEnd } from "lucide-react";

import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            trendai.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block md:w-full h-full ">
        <Image
          src="https://www.trendai.app/assets/images/2.svg"
          alt="Image"
          fill
          className="object-cover   "
          sizes="(max-width: 768px) 0px, 50vw"
        />
      </div>
    </div>
  );
}

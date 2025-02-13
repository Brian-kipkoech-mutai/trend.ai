"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const userContext = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (userContext?.user?.name) {
      router.push("/dashboard");
    }
  }, [userContext, router]);

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Application Performance Notice",
        description: (
          <p className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 mb-5 text-base">
            🚀{" "}
            <strong className="font-semibold">
              Application Performance Notice
            </strong>{" "}
            The backend of this application is hosted on Render's free tier. Due
            to the free tier's limitations, the backend may spin down after
            periods of inactivity. When this happens, the first request after
            inactivity may take{" "}
            <strong className="font-semibold">up to 50 seconds or more</strong>{" "}
            to complete as the backend spins back up. I appreciate your patience
            and understanding! If you have any questions or concerns, please
            feel free to reach out to me at{" "}
            <Link
              href="mailto:kbrianmutai@gmail.com"
              className="hover:text-blue-400 underline underline-offset-2 mx-1"
            >
              kbrianmutai@gmail.com
            </Link>{" "}
            or{" "}
            <Link
              href="tel:+254769694566"
              className="hover:text-blue-400 underline underline-offset-2 mx-1"
            >
              +254769694566
            </Link>
            Thank you for using my application! 🙏
          </p>
        ),
      });
    }, 2000);
  }, []);

  let src = "";

  switch (resolvedTheme) {
    case "light":
      src =
        "https://cdn.dribbble.com/userupload/5341843/file/original-cd42d04d790992de3e32f24e526384ad.png?resize=1600x1200&vertical=center";
      break;
    case "dark":
      src =
        "https://cdn.dribbble.com/userupload/5341843/file/original-cd42d04d790992de3e32f24e526384ad.png?resize=1600x1200&vertical=center";
    default:
      src =
        "https://cdn.dribbble.com/userupload/5341843/file/original-cd42d04d790992de3e32f24e526384ad.png?resize=1600x1200&vertical=center";
      break;
  }

  return (
    <section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <Badge variant="outline" className="animate-appear space-x-2">
            <span className="text-muted-foreground">trendai</span>
            <Link href="/signup" className="flex items-center gap-1">
              Get started
              <ArrowRightIcon className="h-3 w-3 " />
            </Link>
          </Badge>
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground">
            Transform the Way You Connect with Influencers
          </h1>
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground sm:text-xl">
            Streamline your campaign management and influencer collaboration
            with our easy-to-use platform. From campaign creation to content
            approval, we’ve got you covered
          </p>
          <div className=" flex animate-appear justify-center gap-4 delay-300">
            <div className=" flex justify-center gap-4 delay-300">
              <Button className=" w-60 text-lg  uppercase" size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="relative pt-12">
            <Card className="animate-appear delay-700">
              <CardContent>
                <Image
                  src={src}
                  alt="trendai UI app screenshot"
                  width={1248}
                  height={765}
                  className="rounded-sm"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

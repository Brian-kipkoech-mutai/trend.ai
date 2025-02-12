 "use client";

 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { ArrowRightIcon } from "lucide-react";
 import { Section } from "@/components/ui/section";
 import { Mockup, MockupFrame } from "@/components/ui/mockup";
 import Glow from "@/components/ui/glow";
 import Image from "next/image";
 import { useTheme } from "next-themes";
 import { useEffect } from "react";
 import { useUser } from "@/contexts/UserContext";
 import { useRouter } from "next/navigation";
 import Link from "next/link";

 export default function Hero() {
   const { resolvedTheme } = useTheme();
   const userContext = useUser();
   const router = useRouter();

   useEffect(() => {
     if (userContext?.user?.name) {
       router.push("/dashboard");
     }
   }, [userContext, router]);
   let src = "";

   switch (resolvedTheme) {
     case "light":
       src =
         "https://cdn.dribbble.com/userupload/14122239/file/original-16966df6427e7ff7242540259106b269.png?resize=1024x768&vertical=center";
       break;
     case "dark":
       src =
         "https://cdn.dribbble.com/userupload/19423452/file/original-e5b0a6dda25b77ccc2f435e6c9e46511.png?resize=752x&vertical=center";
       break;
     default:
       src =
         "https://cdn.dribbble.com/userupload/5341843/file/original-cd42d04d790992de3e32f24e526384ad.png?resize=1600x1200&vertical=center";
       break;
   }

   return (
     <Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
       <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
         <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
           <Badge variant="outline" className="animate-appear">
             <span className="text-muted-foreground">trendai</span>
             <Link href="/signup" className="flex items-center gap-1">
               Get started
               <ArrowRightIcon className="h-3 w-3" />
             </Link>
           </Badge>
           <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground">
             Transform the Way You Connect with Influencers
           </h1>
           <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
             Streamline your campaign management and influencer collaboration
             with our easy-to-use platform. From campaign creation to content
             approval, we’ve got you covered
           </p>
           <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
             <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
               <Button variant="accept"  className="max-w-screen-sm w-full"  size="lg" asChild>
                 <Link href="/signup">Get Started</Link>
               </Button>
             </div>
           </div>
           <div className="relative pt-12">
             <MockupFrame
               className="animate-appear opacity-0 delay-700"
               size="large"
             >
               <Mockup type="responsive">
                 <Image
                   src={src}
                   alt="trendai UI app screenshot"
                   width={1248}
                   height={765}
                 />
               </Mockup>
             </MockupFrame>
             <Glow
               variant="top"
               className="animate-appear-zoom opacity-0 delay-1000"
             />
           </div>
         </div>
       </div>
     </Section>
   );
 }

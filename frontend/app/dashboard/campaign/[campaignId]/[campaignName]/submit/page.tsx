"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useFormData from "@/hooks/useFormData"; // Assuming custom hook for form data handling
import { submitCampaignApplication } from "@/services/campaignServices";
import { isValidUrl } from "@/utils/utils";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const { campaignId, campaignName } = useParams() as {
    campaignId: string;
    campaignName: string;
  };
  const { formData, handleChange } = useFormData();
  const { toast } = useToast();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  // React Query mutation for form submission
  const { mutate, isPending } = useMutation({
    mutationFn: (campaignData: {
      campaignId: string;
      contentLink: string | undefined;
    }) => submitCampaignApplication(campaignData), // service function to submit the data
    onSuccess: () => {
      toast({
        title: `Content submitted successfully for ${decodeURIComponent(
          campaignName
        )}`,
      });
      formData.contentLink = "";
      queryClient.invalidateQueries({ queryKey: ["campaigns_status"] });

      replace(`/dashboard/campaign/submission-status`);
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        title: "Error submitting content",
        description: (error as any).response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentLink = formData?.contentLink;
    if (!contentLink)
      return toast({
        title: "Empty URL",
        description: "Please enter a URL",
      });
    isValidUrl(contentLink)
      ? mutate({
          campaignId,
          contentLink: formData.contentLink, // Ensure contentLink is always included
        })
      : toast({
          title: "Invalid URL",
          description: "Please enter a valid URL",
          variant: "destructive",
        });
    // Pass form data to mutation
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Submit Content</CardTitle>
          <CardDescription>
            Submit the content link for the campaign.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* Name input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contentLink">Content Link</Label>
              <Input
                id="contentLink"
                name="contentLink"
                placeholder="https://example.com"
                value={formData?.contentLink || ""}
                onChange={handleChange}
                required={true}
                type="text"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => alert("Cancel clicked")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Page;

"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/services/campaignServices";
import CampaignSkeleton from "@/components/campaignSkeleton";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    const { campaignId ,campaignName} = useParams();
    const context = useUser();
    const userRole= context?.user?.role;
  const { isLoading, error, data } = useQuery({
    queryKey: [campaignId],
    queryFn: () => getCampaignById(campaignId as string),
    enabled: !!campaignId,
  });

  if (isLoading) return <CampaignSkeleton />;
  if (error) return <div>Error loading campaign data</div>;
  const { name, description, startDate, endDate, createdAt  } = data?.data || {};
  return (
    <Card className="max-w-screen-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between w-full">
          <span>{name}</span>{" "}
          {userRole === "influencer" && (
            <Link href={`/dashboard/campaign/${campaignId}/${campaignName}/submit`}>
              <Button>Join Campaign</Button>
            </Link>
          )}
        </CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center flex-col gap-1">
          <div className="text-sm">Start Date :</div>
          <Badge variant="outline">
            {startDate ? formatDate(new Date(startDate), "LLL dd, y") : "N/A"}
          </Badge>
        </div>
        <div className="flex items-center flex-col gap-1">
          <div className="text-sm">End Date:</div>
          <Badge variant="outline">
            {endDate ? formatDate(new Date(endDate), "LLL dd, y") : "N/A"}
          </Badge>
        </div>
        <div className="flex items-center flex-col gap-1">
          <div className="text-sm">Date posted :</div>
          <Badge variant="outline">
            {createdAt ? formatDate(new Date(createdAt), "LLL dd, y") : "N/A"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;

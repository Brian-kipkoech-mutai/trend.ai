"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAcceptedCampaigns } from "@/services/campaignServices";
import CampaignSkeleton from "@/components/campaignSkeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

function Page() {
    const { isError, isLoading, data } = useQuery({
        queryKey: ["acceptedCampaigns"],
        queryFn: getAcceptedCampaigns,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <CampaignSkeleton />;
    if (isError) return <div>Error fetching data</div>;

    return (
      <Table>
        <TableCaption>
          A list of your <span className="font-bold">Accepted </span>campaigns
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.data.map((campaign: any) => (
              <TableRow key={campaign.campaignId}>
                <TableCell>{campaign.campaignId.name}</TableCell>
                <TableCell>
                  {format(new Date(campaign.campaignId.startDate), "LLL dd, y")}
                </TableCell>
                <TableCell>
                  {format(new Date(campaign.campaignId.endDate), "LLL dd, y")}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={new Date() > new Date(campaign.campaignId.endDate)?'success':"progress"}
                  >
                    {" "}
                    {new Date() > new Date(campaign.campaignId.endDate)
                      ? "Expired"
                      : "Ongoing"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
}

export default Page;

"use client";

import CampaignSkeleton from "@/components/campaignSkeleton";

import { getAllUserSubmission } from "@/services/submissionServices";
import { useQuery } from "@tanstack/react-query";
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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

function Page() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["campaigns_status"],
    queryFn: getAllUserSubmission,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading) {
    return <CampaignSkeleton />;
  } else if (isError) {
    return <div>error fetching data</div>;
  } else {
    return (
      <Table>
        <TableCaption>A list of your recent subission</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>Submited at</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.data.map((submission: any) => (
              <TableRow key={submission._id} className="space-x-4">
                <TableCell className="md:text-nowrap">
                  {submission.campaignId.name}
                </TableCell>
                <TableCell>
                  {format(new Date(submission.createdAt), "LLL dd, y")}
                </TableCell>
                <TableCell>
                  {" "}
                  <Badge
                    variant={
                      submission.status === "approved"
                        ? "success"
                        : submission.status === "pending"
                        ? "progress"
                        : "rejected"
                    }
                  >
                    {submission.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

export default Page;

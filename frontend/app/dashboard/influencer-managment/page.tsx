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
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import CampaignSkeleton from "@/components/campaignSkeleton";
import {
  getAllsubmissions,
  processSubmission,
} from "@/services/submissionServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["approve submits"],
    queryFn: getAllsubmissions,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["approve submit"],
    mutationFn: (actiondata: { action: string; id: string }) =>
      processSubmission(actiondata),
    onSuccess: (data) => {
      const { action, influencerName, campaignName } = data.data;
      toast({
        title: "Success",
        description: `${
          action === "approve" ? "Approved" : "Rejected"
        } submission for ${influencerName} in ${campaignName}`,
      });

      queryClient.invalidateQueries({ queryKey: ["approve submits"] });
    },
    onError: () => {
      toast({
        title: "Errror processing the submission !",
        variant: "destructive",
      });
    },
  });
  const handleAction = (action: string, id: string) => {
    mutate({ action, id });
  };

  if (isLoading) return <CampaignSkeleton />;
  else if (isError) return <div>error fetching data</div>;
  return (
    <div>
      <Table>
        <TableCaption>A list of influecers application </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>campaignName</TableHead>
            <TableHead>InfluencerName</TableHead>
            <TableHead>ContentLink</TableHead>
            <TableHead className="text-right">DateApplied</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.data.map((submission: any) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.campaignId.name}</TableCell>
                <TableCell>{submission.influencerId.name}</TableCell>
                <TableCell className="text-ellipsis">
                  <a
                    href={submission.contentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {submission.contentLink}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(submission.createdAt), "LLL dd, y")}
                </TableCell>
                <TableCell className="text-right space-x-2 flex flex-wrap gap-2">
                  <Button
                    className=""
                    variant="accept"
                    onClick={() => handleAction("approved", submission._id)}
                    disabled={isPending}
                  >
                    Approve
                  </Button>
                  <Button
                    className=""
                    variant="reject"
                    onClick={() => handleAction("rejected", submission._id)}
                    disabled={isPending}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;

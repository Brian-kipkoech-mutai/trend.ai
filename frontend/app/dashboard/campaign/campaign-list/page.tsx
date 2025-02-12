"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CampaignSkeleton from "@/components/campaignSkeleton";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  getAllCampaignsForBrand,
  getAllCampaignsForInfluencer,
} from "@/services/campaignServices";
import { useUser } from "@/contexts/UserContext";

function Page() {
  const context = useUser();
  const role = context?.user?.role;
  const fetchFunction =
    role === "brand" ? getAllCampaignsForBrand : getAllCampaignsForInfluencer;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchFunction,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className=" ">
      {isLoading ? (
        isError ? (
          <div> erro fetching data</div>
        ) : (
          <CampaignSkeleton />
        )
      ) : (
        <Table className="">
          <TableCaption>A list of all campaigns</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>createdAt</TableHead>
              <TableHead>startDate</TableHead>
              <TableHead className="">EndDate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.data.map((campaign: any) => {
                const createdAt = format(
                  new Date(campaign.createdAt),
                  "LLL dd, y"
                );
                const startDate = format(
                  new Date(campaign.startDate),
                  "LLL dd, y"
                );
                const endDate = format(new Date(campaign.endDate), "LLL dd, y");
                const endcodedName = encodeURIComponent(campaign.name);
                return (
                  <TableRow key={campaign._id}>
                    <TableCell>
                      <Link
                        className="md:text-nowrap"
                        href={`/dashboard/campaign/${campaign._id}/${endcodedName}`}
                      >
                        {campaign.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/campaign/${campaign._id}/${endcodedName}`}
                      >
                        {createdAt}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/campaign/${campaign._id}/${endcodedName}`}
                      >
                        {startDate}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/campaign/${campaign._id}/${endcodedName}`}
                      >
                        {endDate}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default Page;

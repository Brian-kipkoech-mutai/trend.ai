  'use client'
import React from "react";
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
 import { Textarea } from "@/components/ui/textarea"
import useFormData from "@/hooks/useFormData";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ragePicker";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createCampaign } from "@/services/campaignServices";
  
const CreateCampaignPage: React.FC = () => {


  const { formData, handleChange, setFormData } = useFormData();
  const { mutate } = useMutation({
    mutationKey: ["submitCampaign"],
    mutationFn: createCampaign,
    onSuccess: () => {
      toast({
        title: ` Campaign ${formData.name} submmited successfully`,
      });
    },
    onError: () => {
      toast({
        title: `Error  ${formData.name} Submiting  the  Campaing `,
      });
    },
  });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };
  const onDateChange = (date: DateRange | undefined) => {
    const { from: startDate, to: endDate } = date || {};

    setFormData({
      ...formData,
      startDate,
      endDate,
    });
  };
  return (
    <div className=" flex justify-content-cent">
      <Card>
        <CardHeader>
          <CardTitle>Create campaign</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action=" 
            "
            className="space-y-4 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"> Campaign Description</Label>
              <Textarea name="describe  your event" onChange={handleChange} required={true} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Date Rage</Label>
              <DatePickerWithRange onDateChange={onDateChange}   />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className=" space-y-1.5 w-full">
            <Button type="submit" className="w-full">submit</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCampaignPage;

"use client";

import addFoul from "@/actions/addFoul";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EachUtils from "@/components/utils/eachUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  activity: z.string().min(2, "Minimum 2 Character"),
  point: z.coerce
    .number({ message: "Invalid Number" })
    .min(0, "Minimum 0")
    .int("Invalid Integer"),
  description: z.string().max(255, "Maximum 255 character").optional(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: "",
      point: 0,
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const e = await addFoul(values);
    if (e) alert(e.message);
  }

  const formList = [
    {
      label: "Activity",
      key: "activity",
    },
    {
      label: "Point",
      key: "point",
    },
    {
      label: "Description",
      key: "description",
    },
  ] as const;

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <EachUtils
            of={formList.slice()}
            render={({ label, key }) => (
              <FormField
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input placeholder={label} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";
import FillterSelect from "@/components/fillter/fillterSelect";
import useSP from "@/hooks/useSP";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { FillterRangeDate } from "../fillter/FillterRangeDate";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export default function FillterDetail() {
  const pathname = usePathname();
  const { replace, sp, router } = useSP();
  type FillterType = "all" | "30" | "7";
  const presetFillter = (select: FillterType) => {
    switch (select) {
      case "30":
        replace(
          {
            key: "after",
            value: String(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
          },
          { key: "before", value: String(new Date().getTime()) }
        );
        break;
      case "7":
        replace(
          {
            key: "after",
            value: String(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
          { key: "before", value: String(new Date().getTime()) }
        );
        break;
      case "all":
        replace({ key: "before" }, { key: "after" });
        break;
    }
  };

  const toPDF = () => {
    toast("Exporting.....");
    router.push(pathname + "/pdf?" + sp.toString());
  };
  return (
    <div className="w-full h-full flex justify-center items-center m-4 flex-wrap gap-5">
      <FillterRangeDate />
      <Popover>
        <PopoverTrigger asChild>
          <Button>Preset Time</Button>
        </PopoverTrigger>
        <PopoverClose>
          <PopoverContent className="flex flex-col z-10">
            <Button variant={"outline"} onClick={() => presetFillter("all")}>
              All-Time
            </Button>
            <Button variant={"outline"} onClick={() => presetFillter("7")}>
              Last 7 Days
            </Button>
            <Button variant={"outline"} onClick={() => presetFillter("30")}>
              Last 30 Days
            </Button>
          </PopoverContent>
        </PopoverClose>
      </Popover>
      <FillterSelect
        queryKey="order"
        defaultValue="desc"
        className="border p-2 rounded-md"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </FillterSelect>
      <Button onClick={toPDF}>Export to PDF</Button>
    </div>
  );
}

"use client";
import FillerDateTime from "@/components/fillter/fillterDate";
import FillterSelect from "@/components/fillter/fillterSelect";
import useSP from "@/hooks/useSP";

export default function FillterDetail() {
  const { replace, sp } = useSP();
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
  return (
    <div className="w-full h-full flex justify-center items-center m-4 flex-col gap-5">
      <div className="flex gap-2 justify-center items-center">
        <FillerDateTime
          queryKey="after"
          label="After"
          value={sp.get("after") || undefined}
        />
        {"-"}
        <FillerDateTime
          queryKey="before"
          label="Before"
          value={sp.get("after") || undefined}
        />
      </div>
      <select
        defaultValue={"all"}
        onChange={({ target }) => presetFillter(target.value as FillterType)}
        className="border p-2 rounded-md"
      >
        <option value="all">Semua</option>
        <option value="30">30 Hari Terakhir</option>
        <option value="7">7 Hari Terakhir</option>
      </select>
      <FillterSelect queryKey="order" defaultValue="desc">
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </FillterSelect>
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentNIS() {
  const [nis, setNIS] = useState("");
  const router = useRouter();
  return (
    <form
      className="flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("./view/" + nis);
      }}
    >
      <Input
        placeholder="Student NIS"
        onChange={(e) => setNIS(e.target.value)}
      />
      <Button type="submit" disabled={!Boolean(nis.length)}>
        <Search />
      </Button>
    </form>
  );
}

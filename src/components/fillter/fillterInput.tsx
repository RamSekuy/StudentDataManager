"use client";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import useSP from "@/hooks/useSP";
import { InputHTMLAttributes, useState } from "react";

interface FillterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey: string;
  debounce?: number;
  redirect?: "push" | "replace";
  type?: "text" | "number";
}

export default function FillterInput({
  queryKey,
  redirect = "replace",
  debounce = 500,
  type = "text",
  ...props
}: FillterInputProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  const [input, setInput] = useState<string | undefined>(
    sp.get(queryKey) || undefined
  );
  useDebounce(
    () => fn[redirect]({ key: queryKey, value: input || undefined }),
    { triggerValues: [input], delay: debounce }
  );
  return (
    <Input
      {...props}
      type={type}
      defaultValue={sp.get(queryKey) || undefined}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
  );
}

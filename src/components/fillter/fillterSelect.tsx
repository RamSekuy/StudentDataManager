"use client";
import useSP from "@/hooks/useSP";
import { SelectProps } from "@radix-ui/react-select";

interface FillterSelectProps extends SelectProps {
  queryKey: string;
  redirect?: "push" | "replace";
  className?: string;
}

export default function FillterSelect({
  queryKey,
  children,
  redirect = "replace",
  defaultValue,
  className = "",
  ...props
}: FillterSelectProps) {
  const { push, replace, sp } = useSP();
  const fn = { push, replace };
  const value = sp.get(queryKey) || defaultValue;
  return (
    <select
      className={className}
      {...props}
      defaultValue={value}
      onChange={({ target }) => {
        fn[redirect]({
          key: queryKey,
          value: target.value == "all" ? undefined : target.value,
        });
      }}
    >
      {children}
    </select>
  );
}

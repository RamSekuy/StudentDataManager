"use client";
import { ActionForm } from "@/actions/actionForm.class";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type FormActionProps = {
  action: ActionForm<unknown>["execute"];
  children: ReactNode;
  className?: string;
};

export default function FormAction({
  action,
  children,
  className,
}: FormActionProps) {
  const [loading, setLoading] = useState(false);
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const promise = action(new FormData(e.currentTarget));
        toast.promise(promise, {
          loading: "Loading...",
          success: (e) => ({
            style: { background: "green", color: "white" },
            message: e.message,
          }),
          error: (e) => ({
            style: { background: "red", color: "white" },
            message: e.message,
          }),
          finally: () => setLoading(false),
        });
      }}
    >
      {children}
    </form>
  );
}

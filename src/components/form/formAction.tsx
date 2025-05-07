"use client";
import createFormAction from "@/actions/createFormAction";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type FormActionProps = {
  action: ReturnType<typeof createFormAction>;
  children: ReactNode;
  className?: string;
  onSuccess?: () => void;
};

export default function FormAction({
  action,
  children,
  className,
  onSuccess = () => {},
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
          success: (res) => {
            const err = res.error as Error;
            if (err) {
              return {
                style: { color: "white", background: "red" },
                message: `ERROR: ${err}`,
              };
            }
            onSuccess();
            return {
              style: { color: "green" },
              message: res.message,
            };
          },
          error: (e) => {
            console.log(e);
            return "Error: " + e?.error?.message;
          },
          finally: () => setLoading(false),
        });
      }}
    >
      {children}
    </form>
  );
}

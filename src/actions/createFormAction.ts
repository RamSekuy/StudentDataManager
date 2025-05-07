type RawformData = {
  [k: string]: FormDataEntryValue;
};
type FormParams<T> = {
  message?: string;
  action: (formData: RawformData) => Promise<T>;
};

export type ActionResponse<T> = Promise<
  {
    message: string;
    error?: unknown;
  } & T
>;

export default function createFormAction<T>({
  message = "Success",
  action,
}: FormParams<T>) {
  return async (formData: FormData): ActionResponse<T> => {
    try {
      const rawformData = Object.fromEntries(formData.entries());
      const data = await action(rawformData);
      console.log("[Action Success]", data);
      return { message, ...data };
    } catch (error) {
      console.log("[Action Error]: ", error);
      let msg = "ERROR : ";
      if (error instanceof Error) {
        msg += error.message;
      }
      return { error, message: msg } as unknown as ActionResponse<T>;
    }
  };
}

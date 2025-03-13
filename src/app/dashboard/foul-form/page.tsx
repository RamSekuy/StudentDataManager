import FoulForm from "@/components/form/foulForm";

export default function Page() {
  return (
    <div className="p-4 h-full flex-col flex justify-center items-center">
      <p className="font-bold text-4xl my-4">Foul Form</p>
      <FoulForm />
    </div>
  );
}

import StudentForm from "@/components/form/studentForm";

export default function Page() {
  return (
    <div className="p-4 h-full flex-col flex justify-center items-center">
      <p className="font-bold text-4xl my-4">Student Form</p>
      <StudentForm alumniOption={false} />
    </div>
  );
}

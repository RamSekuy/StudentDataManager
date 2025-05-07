import StudentForm from "@/components/form/studentForm";
import Center from "@/components/utils/center";

export default function Page() {
  return (
    <Center vertical>
      <p className="font-bold text-4xl my-4">Student Form</p>
      <StudentForm alumniOption={false} />
      </Center>
  );
}

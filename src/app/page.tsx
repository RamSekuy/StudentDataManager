import AdminForm from "@/components/form/adminForm";
import StudentNIS from "@/components/input/studentNIS";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="h-lvh flex flex-col justify-center items-center gap-4">
      <Dialog>
        <h1 className="font-bold text-xl">Find Student Data</h1>
        <StudentNIS />
        <div className="flex w-full items-center gap-x-4">
          <hr className="w-full h-1 bg-gray-300" />
          <p> OR </p>
          <hr className="w-full h-1 bg-gray-300" />
        </div>
        <DialogTrigger asChild>
          <Button>Continue as Admin</Button>
        </DialogTrigger>
        <DialogContent>
          <AdminForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}

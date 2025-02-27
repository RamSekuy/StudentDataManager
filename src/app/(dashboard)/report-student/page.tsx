import Loading from "@/components/loading/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import {
  FoulContent,
  StudenttContent,
  ReportContent,
} from "./_components/tabContent";

export default function Page() {
  return (
    <Tabs defaultValue="report" className="p-4 my-4">
      <TabsList className="flex w-full  gap-2">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="fouls">Fouls</TabsTrigger>
        <TabsTrigger value="report">Report</TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <Suspense fallback={<Loading />}>
          <StudenttContent />
        </Suspense>
      </TabsContent>
      <TabsContent value="fouls">
        <Suspense fallback={<Loading />}>
          <FoulContent />
        </Suspense>
      </TabsContent>
      <TabsContent value="report">
        <Suspense fallback={<Loading />}>
          <ReportContent />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

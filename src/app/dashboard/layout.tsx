import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import EachUtils from "@/components/utils/eachUtils";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const getData = [
  {
    title: "Students",
    url: "/student",
  },
  {
    title: "Fouls",
    url: "/foul",
  },
];

const editData = [
  {
    title: "Add Student",
    url: "/student-form",
  },
  {
    title: "Add Foul",
    url: "/foul-form",
  },
  {
    title: "Report Student",
    url: "/report-student",
  },
  {
    title: "Other",
    url: "/other",
  },
];

const items = [
  { groupName: "Get Data", list: getData },
  { groupName: "Edit Data", list: editData },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <EachUtils
            of={items}
            render={({ groupName, list }) => (
              <SidebarGroup>
                <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <EachUtils
                      of={list}
                      render={({ title, url }) => (
                        <SidebarMenuItem key={title}>
                          <SidebarMenuButton asChild>
                            <a href={`/dashboard/${url}`}>
                              <span>{title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          />
        </SidebarContent>
      </Sidebar>
      <main className="w-full min-h-screen">
      <nav className="sticky w-full">
        <SidebarTrigger className="fixed"/>
        <h1 className="text-center text-2xl font-semibold my-4">DASHBOARD</h1>
      </nav>
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-screen">
              <Loader2 size={80} />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </SidebarProvider>
  );
}

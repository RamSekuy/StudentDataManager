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
      <nav className="sticky">
        <SidebarTrigger />
      </nav>
      <main className="w-full min-h-screen">{children}</main>
    </SidebarProvider>
  );
}

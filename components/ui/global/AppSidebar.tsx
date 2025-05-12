"use client";

import * as React from "react";
import {
  AppWindowMac,
  BookOpenCheck,
  Boxes,
  Flag,
  LayoutDashboard,
  Navigation,
  Puzzle,
  RectangleEllipsis,
  TestTube,
  User,
} from "lucide-react";

import { NavMain } from "@/components/ui/global/NavMain";
import { BrandSwitcher } from "@/components/ui/global/BrandSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import SidebarLogout from "./SidebarLogout";

const data = {
  user: {
    name: "outperform",
    email: "ashir.arif@outperform",
    avatar: "/images/dashboard/avatar.jpg",
  },
  brand: [
    {
      name: "Anac Lubricants",
      logo: "/images/dashboard/anac_logo.svg",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: User,
    },
    {
      title: "Units",
      url: "/units",
      icon: Boxes,
    },
    {
      title: "Samples",
      url: "/samples",
      icon: BookOpenCheck,
    },
    {
      title: "Machine",
      url: "/machine",
      icon: AppWindowMac,
    },
    // {
    //   title: "Machine Make & Type",
    //   url: "/reports-data-fields/machine-make-type",
    //   icon: BookOpenCheck,
    // },
    {
      title: "Part",
      url: "/part",
      icon: Puzzle,
    },
    // {
    //   title: "Part Make & Type",
    //   url: "/reports-data-fields/part-make-type",
    //   icon: BookOpenCheck,
    // },
    // {
    //   title: "Report Data Fields",
    //   url: "#",
    //   icon: RectangleEllipsis,
    //   items: [
    //     {
    //       title: "Customer Reference",
    //       url: "/reports-data-fields/customer-reference",
    //     },
    //     {
    //       title: "Machine",
    //       url: "/reports-data-fields/machine",
    //     },
    //     {
    //       title: "Machine Make & Type",
    //       url: "/reports-data-fields/machine-make-type",
    //     },
    //     {
    //       title: "Part",
    //       url: "/reports-data-fields/part",
    //     },
    //     {
    //       title: "Part Make & Type",
    //       url: "/reports-data-fields/part-make-type",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isCollapsed) {
      setOpen(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <SidebarHeader className="border-b">
        <BrandSwitcher brand={data.brand} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarLogout />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

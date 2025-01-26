"use client"

import * as React from "react"
import {
  BookOpenCheck,
  Boxes,
  ChartBar,
  Flag,
  LayoutDashboard,
  Navigation,
  RectangleEllipsis,
  TestTube,
  User,
  UserRoundCog,
} from "lucide-react"

import { NavMain } from "@/components/ui/global/NavMain"
import { BrandSwitcher } from "@/components/ui/global/BrandSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import SidebarLogout from "./SidebarLogout"


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
      title: "Reports To Validate",
      url: "/validate-reports",
      icon: Navigation,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: Flag,
    },
    {
      title: "Customers",
      url: "#",
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
      title: "Lab",
      url: "#",
      icon: TestTube,
    },
    {
      title: "Statistics",
      url: "/statistics",
      icon: ChartBar,
    },
    {
      title: "Support",
      url: "/support",
      icon: UserRoundCog,
    },
    {
      title: "Report Data Fields",
      url: "#",
      icon: RectangleEllipsis,
      items: [
        {
          title: "Customer Reference",
          url: "#",
        },
        {
          title: "Machine",
          url: "#",
        },
        {
          title: "Machine Make & Type",
          url: "#",
        },
        {
          title: "Part",
          url: "#",
        },
        {
          title: "Part Make & Type",
          url: "#",
        },
        {
          title: "Sample No",
          url: "#",
        },
        {
          title: "Report Date",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Orders",
    //   url: "/orders",
    //   icon: ShoppingCart,
    // },
    // {
    //   title: "Premium Register",
    //   url: "/premium-register",
    //   icon: ShieldCheck,
    // },
    // {
    //   title: "Create Policy",
    //   url: "/create-policy",
    //   icon: FilePlus,
    // },
    // {
    //   title: "Bancassurance Setup",
    //   url: "/bancassurance-setup",
    //   icon: BanknoteIcon,
    // },
    // {
    //   title: "Tracker Mechanism Setup",
    //   url: "/tracker-mechanism-setup",
    //   icon: Settings,
    // },
    // {
    //   title: "Thank You",
    //   url: "/thank-you",
    //   icon: ThumbsUp,
    // },
    // {
    //   title: "Warranties Add Setup",
    //   url: "/warranties-add-setup",
    //   icon: PlusCircle,
    // },
    // {
    //   title: "Warranties Setup",
    //   url: "/warranties-setup",
    //   icon: SettingsIcon,`
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon"  {...props}>
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
  )
}

"use client"

import * as React from "react"
import {
  BookOpenCheck,
  Boxes,
  Flag,
  LayoutDashboard,
  Navigation,
  RectangleEllipsis,
  TestTube,
  User,
} from "lucide-react"

import { NavMain } from "@/components/ui/global/NavMain"
import { BrandSwitcher } from "@/components/ui/global/BrandSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar
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
      title: "Lab",
      url: "/labs",
      icon: TestTube,
    },
    // {
    //   title: "Statistics",
    //   url: "/statistics",
    //   icon: ChartBar,
    // },
    // {
    //   title: "Support",
    //   url: "/support",
    //   icon: UserRoundCog,
    // },
    {
      title: "Report Data Fields",
      url: "#",
      icon: RectangleEllipsis,
      items: [
        {
          title: "Customer Reference",
          url: "/reports-data-fields/customer-reference",
        },
        {
          title: "Machine",
          url: "/reports-data-fields/machine",
        },
        {
          title: "Machine Make & Type",
          url: "/reports-data-fields/machine-make-type",
        },
        {
          title: "Part",
          url: "/reports-data-fields/part",
        },
        {
          title: "Part Make & Type",
          url: "/reports-data-fields/part-make-type",
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
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isCollapsed) {
      setOpen(false)
    }
  }

  return (
    <Sidebar collapsible="icon" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}  {...props}>
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

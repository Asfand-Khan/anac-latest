"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function BrandSwitcher({
  brand,
}: {
  brand: {
    name: string
    logo: string
  }[]
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="relative flex group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-6 w-24 h-14 mx-auto">
          {brand[0].logo && <Image src={brand[0].logo} fill className="w-full h-full" alt={brand[0].name} />}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

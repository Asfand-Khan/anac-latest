import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../sidebar'
import { LogOut } from 'lucide-react'

const SidebarLogout = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton variant="primary" size="lg" className='mx-auto w-max group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:justify-start justify-center'>
                    <LogOut className='!w-5 !h-5 group-data-[collapsible=icon]:!w-4 group-data-[collapsible=icon]:!h-4' />
                    Logout
                </SidebarMenuButton >
            </SidebarMenuItem>
        </SidebarMenu>

    )
}

export default SidebarLogout
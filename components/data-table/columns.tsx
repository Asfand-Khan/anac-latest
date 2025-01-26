"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Edit, Trash, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Employee = {
    id: string
    name: string
    email: string
    phone: string
    address: string
    department: string
    position: string
    salary: number
    hireDate: string
    performance: number
    projects: number
    status: "active" | "inactive"
}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "reference",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-left pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reference
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "hireDate",
        header: "Hire Date",
    },
    {
        accessorKey: "performance",
        header: "Performance",
        cell: ({ row }) => {
            const performance = parseFloat(row.getValue("performance"))
            return <div className="text-center">{performance.toFixed(1)}</div>
        },
    },
    {
        accessorKey: "projects",
        header: "Projects",
        cell: ({ row }) => {
            const projects = parseInt(row.getValue("projects"))
            return <div className="text-center">{projects}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <Badge className="justify-center py-2 min-w-[69px]" variant={status === 'active' ? 'success' : 'danger'} >{status as string}</Badge>
            )
        },
    },
    {
        accessorKey: "location", 
        header: "Location",
        cell: ({ row }) => {
            const location = row.getValue("location");
            return <div className="text-left">{location as string}</div>;
        },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const employee = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log("View", employee)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Edit", employee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log("Delete", employee)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

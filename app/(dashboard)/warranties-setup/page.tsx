import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <div className="flex md:flex-row flex-col gap-2 md:justify-between md:items-center">
                <h1 className="text-2xl font-semibold">Warranties Setup</h1>
                <Link href="/warranties-add-setup" passHref>
                    <Button variant="primary" size="lg">
                        Add
                    </Button>
                </Link>
            </div>
            <Card className="w-full shadow-none border-0">
                <CardHeader className="border-b py-4">
                    <CardTitle className="tracking-tight text-lg font-semibold">Warranties Setup</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="lg:w-1/2 w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='hover:no-underline'>
                                Old Cars Comprehensive Insurance
                            </AccordionTrigger>
                            <AccordionContent>
                                <Table className='border'>
                                    <TableHeader className='bg-[#f6f6f6]'>
                                        <TableRow>
                                            <TableHead>Pseudo Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Default</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Tracker</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Immediate FIR Clause</TableCell>
                                            <TableCell>012</TableCell>
                                            <TableCell>Warranted that in case th</TableCell>
                                            <TableCell>Yes</TableCell>
                                            <TableCell>Enabled</TableCell>
                                            <TableCell>No.</TableCell>
                                            <TableCell>
                                                <Button variant={"link"}>
                                                    <Edit />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className='hover:no-underline'>
                                Old Cars Comprehensive Insurance
                            </AccordionTrigger>
                            <AccordionContent>
                                <Table className='border'>
                                    <TableHeader className='bg-[#f6f6f6]'>
                                        <TableRow>
                                            <TableHead>Pseudo Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Default</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Tracker</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Immediate FIR Clause</TableCell>
                                            <TableCell>012</TableCell>
                                            <TableCell>Warranted that in case th</TableCell>
                                            <TableCell>Yes</TableCell>
                                            <TableCell>Enabled</TableCell>
                                            <TableCell>No.</TableCell>
                                            <TableCell>
                                                <Button variant={"link"}>
                                                    <Edit />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </>
    )
}

export default page
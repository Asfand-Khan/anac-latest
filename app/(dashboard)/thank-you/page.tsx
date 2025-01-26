"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, LayoutDashboard } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

const page = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
            >
                <Card className="w-full h-full flex flex-col justify-center items-center text-center shadow-none border-0">
                    <CardContent className="space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mx-auto"
                        >
                            <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto" />
                        </motion.div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
                                Thank You!
                            </h1>
                            <p className="text-charcoal">
                                Your submission has been received. We appreciate your interest and will get back to you shortly.
                            </p>
                        </div>

                        <div className="pt-4 space-y-4">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Button
                                    variant="secondary"
                                    size={"lg"}
                                    className="w-full sm:w-auto group"
                                    asChild
                                >
                                    <Link href="#">
                                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                        Go Back
                                    </Link>
                                </Button>
                                <Button
                                    variant="primary"
                                    size={"lg"}
                                    className="w-full sm:w-auto group"
                                    asChild
                                >
                                    <Link href="/">
                                        <LayoutDashboard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                        Dashboard
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

export default page
import React from 'react'
import type { Metadata } from "next";
import Auth from '@/components/ui/auth/Auth';

export const metadata: Metadata = {
  title: "Login | Anac Lubricants",
  description: "Anac Total Energies Limited",
};

const Page = () => {
  return (
    <Auth />
  )
}

export default Page
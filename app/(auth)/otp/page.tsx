import React from 'react'
import type { Metadata } from "next";
import Auth from '@/components/ui/auth/Auth';

export const metadata: Metadata = {
  title: "OTP | Anac Lubricants",
  description: "Anac Total Energies Limited",
  // metadataBase: new URL("http://localhost:3001"),
};

const page = () => {
  return (
    <Auth />
  )
}

export default page
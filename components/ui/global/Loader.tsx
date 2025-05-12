"use client";

import { LoaderIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../card";

const Loader = () => {
  return (
    <Card className={`w-full shadow-none border-0 h-full`}>
      <CardContent className="flex items-center justify-center h-full">
        <LoaderIcon className="animate-spin text-primary-100" size={50} />
      </CardContent>
    </Card>
  );
};

export default Loader;

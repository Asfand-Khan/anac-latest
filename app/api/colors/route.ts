import { NextResponse } from "next/server";

export async function GET() {
  const colors = {
    "primary-100": "#ff0000",
    "primary-200": "#FF7A7A",
  };

  return NextResponse.json(colors);
}

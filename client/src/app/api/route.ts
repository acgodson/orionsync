import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(process.env.API_KEY)
  const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY || "",
    },
    body: JSON.stringify({
      title: "Huddle01-Test-Orion",
      roomLock: false,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}

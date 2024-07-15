import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("at server", request.body);
  return NextResponse.json({ id: 1, name: "Mike" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body.title)
  return NextResponse.json({ id: 2, name: `Peter ${body.title}` });
}

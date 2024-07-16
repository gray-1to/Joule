import { NextRequest, NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(request: NextRequest) {
  console.log("at server", request.body);
  return NextResponse.json({ id: 1, name: "Mike" });
}

export async function POST(request: NextRequest) {
  console.log("post requested")
  const body = await request.json();
  // console.log(body.title)
  // console.log(body.body)
  const $ = cheerio.load(body.body)
  console.log($('h2').text())
  return NextResponse.json({ id: 2, name: `Peter ${body.title}` });
}

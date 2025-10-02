import { sleep } from "@/util/sleep";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;
  const searchParams = request.nextUrl.searchParams;
  const { ms } = Object.fromEntries(searchParams.entries()) as {
    ms?: string;
  };

  console.log("msda", ms);
  await sleep(Number(ms ?? 1000));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  const user = await response.json();

  return NextResponse.json(user);
}

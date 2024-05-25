import { getData } from "@/lib/api-client";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await getData(body);
  return Response.json(data);
}

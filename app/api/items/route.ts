import { getTags } from "@/components/tags/tags";
import { readData } from "@/utils/dataHandler";
import { NextRequest } from "next/server";
import path from "path";



export async function POST(req: NextRequest) : Promise<Response> {
    const request: { tagID: string } = await req.json();
    // const itemFile = path.join((await getTags(request.tagID)).UUID, "items.json");



    // console.log(itemFile);
    console.log(request)



    // const oldData = await readData()

    // Store Item

    // Store Image



    return Response.json({})
}

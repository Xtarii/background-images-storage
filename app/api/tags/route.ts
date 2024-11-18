import { response } from "@/utils/api/types";
import { createDirectory, readData, removeDirectory, writeData } from "@/utils/dataHandler";
import { Tag, TagsFile } from "@/utils/dataTypes";
import { NextRequest } from "next/server";
import path from "path";



/// Tag file
const file = "/public/items/tags.json";



/// Adds Tag to tags list
export async function POST(req: NextRequest) : Promise<Response> {
    const data: {id: string, value: Tag} = await req.json();

    // Constructs new Data
    const oldData = await readData<TagsFile>(file);
    if(!oldData) {
        const newData: TagsFile = {tags: {}};
        newData.tags[data.id] = data.value; // Adds data
        await writeData(file, newData); // Creates new file with specified tag
    }else {
        // Appends Data
        oldData.tags[data.id] = data.value;
        await writeData(file, oldData); // Overrides old data with pushed item
    }

    // Creates Directory
    await createDirectory(path.join("/public/items/", data.value.UUID));

    const message: response<null> = { status: true, message: "Stored tag" };
    return Response.json(message);
}

/// Reads tags from tags list
export async function GET() : Promise<Response> {
    const res = await readData<TagsFile>(file);
    if(!res) {
        const message: response<null> = { status: false, message: "Could not read tags" };
        return Response.json(message);
    }

    // Responds with data
    const message: response<TagsFile> = {
        status: true,
        message: "Read tags",
        data: res
    };
    return Response.json(message);
}

/// Removes tag from tags list
export async function DELETE(req: NextRequest) : Promise<Response> {
    const data: { id: string } = await req.json();
    const oldData = await readData<TagsFile>(file);
    if(!oldData) {
        const message: response<null> = { status: false, message: "Could not remove tag" };
        return Response.json(message);
    }


    // Removes Tag of ID
    const newData: TagsFile = { tags: {} };
    for(const obj in oldData?.tags) if(obj !== data.id) newData.tags[obj] = oldData.tags[obj];
    await writeData(file, newData);

    // Remove Directory
    await removeDirectory(path.join("/public/items/", oldData.tags[data.id].UUID));

    // Sends Response
    const message: response<string> = { status: true, message: "Removed tag", data: data.id };
    return Response.json(message);
}

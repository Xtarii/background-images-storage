import { ItemsFile } from "@/utils/dataTypes";
import { readData, writeData, writeRawData } from "../handler";
import { getTags } from "../tags/tags";
import path from "path";



/**
 * Stores Image to storage bucket
 *
 * @param tagID Tag ID, tag name
 * @param data Item Data
 * @returns Response
 */
export async function storeItem(tagID: string, data: { title: string, UUID: string, image: ArrayBuffer }) : Promise<boolean | { status: boolean, data: { id: string, path: string, fullPath: string }}> {
    const tagObject = await getTags(tagID);

    // Generates Image URL
    const imageURL = path.join(tagObject.UUID, "imgs", `${data.title}-${data.UUID}.jpg`);
    const res = await writeRawData(imageURL, data.image);

    // Adds item to items list
    const old = await readData<ItemsFile>(`/${tagObject.UUID}/items.json`);
    if(old) {
        old.items.push({
            title: data.title,
            UUID: data.UUID,
            imageURL
        });
        await writeData<ItemsFile>(`/${tagObject.UUID}/items.json`, old);
    }else {
        await writeData<ItemsFile>(`/${tagObject.UUID}/items.json`, {
            items: [{title: data.title, UUID: data.UUID, imageURL}]
        });
    }
    return res;
}


export async function deleteItem(tagID: string, itemUUID: string) {
    const tagObject = await getTags(tagID);
    const old = await readData<ItemsFile>(`/${tagObject.UUID}/items.json`);
    if(!old) return false; // No file found

    const newList: ItemsFile = {items: []};
    console.log(old);
    for(const item in old.items) {
        console.log(item);
    }
}

import { Item, ItemsFile } from "@/utils/dataTypes";
import { readData, writeData, writeRawData } from "../handler";
import { getTags } from "../tags/tags";
import path from "path";
import { supabase } from "@/utils/api/routes";



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



/**
 * Deletes Item and removes item data
 *
 * @param tagID Tag ID, tag name
 * @param item Item object
 * @returns Response
 */
export async function deleteItem(tagID: string, item: Item) : Promise<boolean | { status: boolean, data: string }> {
    const tagObject = await getTags(tagID);
    const old = await readData<ItemsFile>(`/${tagObject.UUID}/items.json`);
    if(!old) return false; // No file found

    const newList: ItemsFile = {items: []};
    for(const item of old.items) if(item.UUID !== item.UUID) newList.items.push(item)

    // Removes Image, item itself is auto removed
    await supabase.storage.from("items").remove([item.imageURL]);
    writeData(`/${tagObject.UUID}/items.json`, newList); // Stores new Data

    return { status: true, data: "Removed item from list" };
}





/**
 * Get all items of tag
 *
 * @param tagID Tag ID, tag name
 * @returns Items list
 */
export async function getItems(tagID: string) : Promise<Item[]> {
    const tag = await getTags(tagID);
    const items = await readData<ItemsFile>(`/${tag.UUID}/items.json`);
    if(items) return items.items;
    return [];
}

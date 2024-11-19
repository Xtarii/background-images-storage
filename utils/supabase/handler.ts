import { supabase } from "../api/routes";
import { ItemsFile, TagsFile } from "../dataTypes";



/**
 * Reads File Data in Bucket
 *
 * @param file File to read
 * @returns File content
 */
export async function readData<T extends TagsFile | ItemsFile>(file: string) : Promise<T | null> {
    const data = await supabase.storage.from("items").download(file);
    if(data.data) return JSON.parse(await data.data?.text());
    return null;
}

/**
 * Writes Data to file in bucket
 *
 * @param file File to write to
 * @param data Data to store
 * @returns Result
 */
export async function writeData<T extends TagsFile | ItemsFile>(file: string, data: T) : Promise<boolean | { status: boolean, data: { id: string, path: string, fullPath: string }}> {
    const result = await supabase.storage.from("items").upload(file, JSON.stringify(data), {
        upsert: true,
        cacheControl: "60"
    });
    if(result.error) return false;
    return { status: true, data: result.data };
}

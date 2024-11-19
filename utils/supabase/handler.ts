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
    return await writeRawData(file, JSON.stringify(data));
}



/**
 * Writes Raw Data to file
 *
 * {@link writeData} will parse json
 * structure data and write it to a
 * file. This will write the raw
 * data into the file.
 *
 * Data could also be an array buffer
 * making it possible to store images.
 *
 * @param file File
 * @param data Data
 * @returns Result
 */
export async function writeRawData(file: string, data: string | ArrayBuffer) : Promise<boolean | { status: boolean, data: { id: string, path: string, fullPath: string }}> {
    const result = await supabase.storage.from("items").upload(file, data, {
        upsert: true,
        cacheControl: "3600"
    });
    if(result.error) return false;
    return { status: true, data: result.data };
}

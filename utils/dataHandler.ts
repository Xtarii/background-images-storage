import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { ItemsFile, TagsFile } from "./dataTypes";
import path from "path";



/**
 * Writes {@link data} to file.
 *
 * This will remove all the old data
 * and store the new data,
 * replacing everything.
 *
 * @param file File to write to
 * @param data New data
 */
export async function writeData<T extends TagsFile | ItemsFile>(file: string, data: T) : Promise<void> {
    const json = JSON.stringify(data, null, 2);
    writeFileSync(path.join(process.cwd(), file), json, { encoding: "utf-8", flag: "w" });
}

/**
 * Reads file
 *
 * Reads file content ( JSON ) and
 * returns the data as {@link T}.
 *
 * @param file File to read
 * @returns File Data
 */
export async function readData<T extends TagsFile | ItemsFile>(file: string) : Promise<T | null> {
    const res = readFileSync(path.join(process.cwd(), file), { encoding: "utf-8" });
    if(res == undefined || res == null || res == "") return null; // Stops handling data

    // Handles Data
    const data: T = await JSON.parse(res);
    return data;
}





/**
 * Removes directory and its content
 *
 * @param directory Directory to remove
 */
export async function removeDirectory(directory: string) {
    rmSync(path.join(process.cwd(), directory), { recursive: true, force: true });
}

/**
 * Creates a new directory
 *
 * @param directory Directory to create
 */
export async function createDirectory(directory: string) {
    mkdirSync(path.join(process.cwd(), directory), { recursive: true });

    // Create sub file for holding items
    await writeData<ItemsFile>(path.join(directory, "items.json"), { items: [] });
    mkdirSync(path.join(process.cwd(), directory, "imgs"), { recursive: true }); // Creates Images Directory
}

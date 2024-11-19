import { supabase } from "@/utils/api/routes";
import { ItemsFile, Tag, TagsFile } from "@/utils/dataTypes";
import { readData, writeData } from "@/utils/supabase/handler";



/**
 * Adds tag to tag list
 *
 * @param id Tag ID
 * @param value Tag object
 * @returns Upload status
 */
export async function addTag(id: string, value: Tag) : Promise<{status: boolean, message: string}> {
    // Read old data
    const old = await readData<TagsFile>("/tags.json");
    let newData: TagsFile; // New Data, old data will be written to this as well

    if(!old) newData = {tags: {}};
    else newData = old; // Copies old data to new data
    newData.tags[id] = value;

    // Creates Folder with tags
    await writeData<ItemsFile>(`/${value.UUID}/items.json`, { items: [] });

    const result = await writeData("/tags.json", newData); // Writes to database
    if(result === false) return { status: false, message: "Could not upload tag" };
    return { status: true, message: "Uploaded tag" };
}

/**
 * Deletes tag
 *
 * Deletes ```Tag``` and any item
 * associated with the tag.
 *
 * @param id Tag ID, the name of the tag
 * @returns Response
 */
export async function deleteTag(id: string) : Promise<{status: boolean, message: string}> {
    const old = await readData<TagsFile>("/tags.json");
    if(!old) return { status: false, message: "Could not remove tag" };
    const newData: TagsFile = {tags: {}};

    // Overrides old data with new data
    for(const tag in old.tags) if(tag !== id) newData.tags[tag] = old.tags[tag];
    const response = await writeData("/tags.json", newData);

    // Remove old directory
    if(old.tags[id]) {
        const items = await supabase.storage.from("items").list(`/${old.tags[id].UUID}/`);
        if(!items.error) {
            const list = items.data.map(file => `/${old.tags[id].UUID}/${file.name}`);
            await supabase.storage.from("items").remove(list);
        }
    }



    // Status Message
    if(response === false) return { status: false, message: "Could not remove tag" };
    return { status: true, message: "Removed tag" };
}





/**
 * Get tag with ID
 *
 * @param id Tag ID
 * @returns Tag object
 */
export async function getTags(id: string) : Promise<Tag>;
/**
 * Get tag list
 *
 * This will get all the tags
 * of the tags list.
 *
 * ```ts
 * // Gets all tags
 * getTags();
 *
 * // Gets tag with id
 * getTags("id");
 * ```
 *
 * @returns Tags List
 */
export async function getTags() : Promise<TagsFile>;

export async function getTags(id?: string) : Promise<TagsFile | Tag | null> {
    const res = await readData<TagsFile>("/tags.json");

    if(!res) return null; // Returns no Tag or Tag Data, no error needed
    else if(!id) return res; // Returns all data, else only the data with ID
    return res.tags[id];
}


/**
 * Gets tags API response
 *
 * This will call the getTag API route
 * and return the full response.
 *
 * ##### OBS
 * This will include the tags, but
 * if the tags is what is needed
 * consider using {@link getTags()}.
 *
 * @returns Response
 */
export async function getTagsRaw() : Promise<any> {
    const res = await readData<TagsFile>("/tags.json");
    return res;
}

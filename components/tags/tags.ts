import { Tag, TagsFile } from "@/utils/dataTypes";



/**
 * Adds Tag to tag list
 *
 * @param id Tag ID, the name of the tag
 * @param value Tag object
 * @returns Response
 */
export async function addTag(id: string, value: Tag) : Promise<any> {
    const res = await fetch("/api/tags", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({id, value})
    });
    return await res.json();
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
export async function deleteTag(id: string) : Promise<any> {
    const res = await fetch("/api/tags", {
        method: "delete",
        body: JSON.stringify({ id })
    });
    return await res.json();
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

export async function getTags(id?: string) : Promise<TagsFile | Tag> {
    const res = await fetch("/api/tags", { method: "get" });
    const data: TagsFile = (await res.json()).data;
    if(!id) return data; // Returns all data, else only the data with ID
    return data.tags[id];
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
    const res = await fetch("/api/tags", { method: "get" });
    return await res.json();
}

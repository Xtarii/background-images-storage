/**
 * Create Page
 *
 * This Page will be the center of creating new content
 * and adding that content to the site.
 */
"use client";
import { deleteItem, storeItem } from "@/utils/supabase/items/items";
import { getTags } from "@/utils/supabase/tags/tags";
import path from "path";
import { FormEvent, ReactElement, useRef } from "react";
import { v7 } from "uuid";



export default function Create() : ReactElement {
    const ref = useRef<HTMLFormElement>(null);



    return(<div>
        <h1>Create New Item</h1>


        <form ref={ref} onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();


            // Get Form Data
            const data = new FormData(e.currentTarget);
            const image = data.get("image") as File;
            const name = data.get("name")?.toString();
            const tagID = data.get("tag")?.toString();

            if(tagID === undefined || name === undefined || image === null) return;


            // Get Image Data
            const arrayBuffer = await image.arrayBuffer();
            // const buffer = new Uint8Array(arrayBuffer);

            // Create new Item
            const item = {
                title: name,
                UUID: v7(),

                image: arrayBuffer
            };

            console.log(item); // DEBUG

            // Push Item to Github-pages

            /**
             * There is gonna be a super file that contains
             * the tags,
             *
             * every tag has a sub-folder with a file: tag.json
             * that file will tell what files is located in that folder
             *
             *
             * Image URLS are located as:
             * UUID_TAG / imgs / CUSTOM_NAME - UUID_IMAGE . jpg
             */
            ///



            const tag = await getTags(tagID);
            if(!tag) return; // Stops if there is no tag found

            // storeItem(tagID, item);
            console.log(await deleteItem(tagID, item.UUID));


            // Redirect to other page
            ref.current?.reset(); // Clears Form
        }}>
            <input type="text" name="tag" required />
            <input type="text" name="name" required />
            <input type="file" name="image" required />

            <input type="submit" value="Create Item" />
        </form>
    </div>);
}

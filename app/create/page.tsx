/**
 * Create Page
 *
 * This Page will be the center of creating new content
 * and adding that content to the site.
 */
"use client";
import { getTags } from "@/components/tags/tags";
import { APIs } from "@/utils/api/routes";
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
            const name = data.get("name");
            const tag = data.get("tag")?.toString();


            // Get Image Data
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            // Create new Item
            const item = {
                title: name,
                UUID: v7(),

                image: buffer
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


            if(!tag) return;
            const TAG = await getTags(tag);

            const imageURL = path.join(TAG.UUID, "imgs", `${name}-${item.UUID}.jpg`);
            console.log(imageURL);


            const res = await fetch(APIs.items, {
                headers: { "Content-Type": "application/json" },

                method: "post",
                body: JSON.stringify({tagID: "guys"})
            })



            // const uuid = v7();
            // console.log(uuid);

            // addTag("guys", { UUID: uuid }).then(res => console.log(res));



            // getTags().then(value => console.log(value));
            // getTags("test").then(value => console.log(value));
            // getTagsRaw().then(value => console.log(value));

            // deleteTag("guys");



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

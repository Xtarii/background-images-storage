/**
 * Create Page
 *
 * This Page will be the center of creating new content
 * and adding that content to the site.
 */
"use client";
import { FormEvent, ReactElement, useRef } from "react";



export default function Create() : ReactElement {
    const ref = useRef<HTMLFormElement>(null);



    return(<div>
        <h1>Create New Item</h1>


        <form ref={ref} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();


            // Get Form Data
            const data = new FormData(e.currentTarget);
            const image = data.get("image");
            const name = data.get("name");

            // Get Image Data

            // Create new Item
            const item = {
                name: name,
                image: image
            };

            console.log(item); // DEBUG

            // Push Item to Github-pages

            /**
             * There is gonna be a super file that contains
             * the tags,
             *
             * every tag has a sub-folder with a file: tag.json
             * that file will tell what files is located in that folder
             */
            ///

            // const d: Tag = {
            //     UUID: "UUID"
            // }

            // fetch("/api/tags", {
            //     headers: {
            //         "Content-Type": "application/json"
            //     },

            //     method: "post",
            //     body: JSON.stringify({id: "test1", value: d})
            // }).then(async value => console.log(await value.json()))

            // fetch("/api/tags", {
            //     method: "get"
            // }).then(async res => console.log(await res.json()))

            // fetch("/api/tags", {
            //     method: "delete",
            //     body: JSON.stringify({id: "test1"})
            // }).then(async res => console.log(await res.json()))



            // Redirect to other page
            ref.current?.reset(); // Clears Form
        }}>
            <input type="text" name="name" required />
            <input type="file" name="image" required />

            <input type="submit" value="Create Item" />
        </form>
    </div>);
}

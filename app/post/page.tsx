/**
 * Create Page
 *
 * This Page will be the center of creating new content
 * and adding that content to the site.
 */
"use client";
import SpinningWheel from "@/components/loadingbars/spinning";
import MessageBox from "@/components/messages/messagebox";
import { links } from "@/utils/api/routes";
import { storeItem } from "@/utils/supabase/items/items";
import { FormEvent, ReactElement, useRef, useState } from "react";
import { v7 } from "uuid";



export default function Create() : ReactElement {
    const ref = useRef<HTMLFormElement>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ messageBox, showMessageBox ] = useState<boolean>(false);



    return(<div className="mt-16">
        {/* Loading Bar */}
        { loading && <SpinningWheel /> }

        {messageBox && <MessageBox title="Uploaded Item" onClose={() => showMessageBox(false)}>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Your Item was uploaded and can now be found under <a className="text-blue-500" href={links.explore}>Explore</a>!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                It may take some time before the image apers, be patient.
            </p>
        </MessageBox>}

        {/* Form Element */}
        <form ref={ref} onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);


            // Get Form Data
            const data = new FormData(e.currentTarget);
            const image = data.get("image") as File;
            const name = data.get("name")?.toString();
            const tagID = data.get("tag")?.toString();
            if(tagID === undefined || name === undefined || image === null) return;

            // Store Data
            const arrayBuffer = await image.arrayBuffer();
            const uuid = v7();
            const res = await storeItem(tagID, { title: name, UUID: uuid, image: arrayBuffer });
            console.log(res); // DEBUG

            // Redirect to other page
            ref.current?.reset(); // Clears Form
            setLoading(false);
            showMessageBox(true);
        }}

        className="max-w-sm mx-auto"
        >
            <div className="mb-5">
                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Tag</label>
                <input type="text" id="tag" name="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="guys" required />
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Name</label>
                <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="flex items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input id="image" name="image" type="file" className="hidden" />
                </label>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
        </form>
    </div>);
}

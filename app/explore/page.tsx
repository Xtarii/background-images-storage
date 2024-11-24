"use client";
import SpinningWheel from "@/components/loadingbars/spinning";
import { supabase } from "@/utils/api/routes";
import { Item } from "@/utils/dataTypes";
import { convertBlobToBase64 } from "@/utils/images/ImageHandler";
import { getItems } from "@/utils/supabase/items/items";
import { ReactElement, useEffect, useState } from "react";



/// Explore Page
export default function Explore() : ReactElement {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ items, setItems ] = useState<{item: Item, url: string}[]>();


    // Page items
    useEffect(() => {
        (async () => {
            // Get all items
            const items = await getItems("guys");
            const fixed: {item: Item, url: string}[] = [];
            for(const item of items) { // This will fix each image URL
                const url = supabase.storage.from("items").getPublicUrl(item.imageURL);
                const image = await fetch(url.data.publicUrl);

                const blob = await image.blob();
                item.imageURL = await convertBlobToBase64(blob);
                fixed.push({item, url: url.data.publicUrl});
            }

            // Add items to a list
            setItems(fixed);
            setLoading(false);
        })()
    }, []);



    return(<div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-4">
        {loading && <SpinningWheel />}
        {items?.map((value, key) => <div key={key} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={value.item.imageURL} alt={value.item.title} key={key} className="rounded-t-lg w-full h-auto" />

            <div className="p-5">
                <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{value.item.title}</p>
            </div>
        </div>)}
    </div>);
}

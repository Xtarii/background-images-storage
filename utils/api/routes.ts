/// API routes config
///

import path from "path";



/**
 * API Routes Base Path
 */
export const base = process.env.NODE_ENV === "production" ? "/background-images-storage/" : "";



/**
 * APIs routes
 */
export const APIs = {
    /**
     * Tags API route
     */
    tags: (base + "/api/tags"),
    /**
     * Items API route
     */
    items: (base + "/api/items")
}

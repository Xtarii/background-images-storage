/// API routes config
///

import path from "path";



/**
 * API Routes Base Path
 */
export const base = process.env.NODE_ENV === "production" ? "background-images-storage" : "";



/**
 * APIs routes
 */
export const APIs = {
    /**
     * Tags API route
     */
    tags: path.join(base, "/api/tags"),
    /**
     * Items API route
     */
    items: path.join(base, "/api/items")
}

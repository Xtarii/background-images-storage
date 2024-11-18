/// Tags File
///
/// Stores all the tags that exists
///

/**
 * Tag type
 */
export type Tag = {
    /**
     * Tag UUID
     */
    UUID: string
}

/**
 * Tags file
 */
export type TagsFile = {
    /**
     * Holds a list of all the tags
     */
    tags: {[key: string]: Tag}
}



/// Item File
///
/// Stores all the items in a
/// directory.
///

/**
 * Item type
 */
export type Item = {
    /**
     * Item Title
     */
    title: string

    /**
     * Item UUID
     */
    UUID: string


    /**
     * Item Image URL
     */
    imageURL: string
}

/**
 * Items file
 */
export type ItemsFile = {
    /**
     * Items List
     */
    items: Item[]
}

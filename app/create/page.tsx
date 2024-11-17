/**
 * Create Page
 *
 * This Page will be the center of creating new content
 * and adding that content to the site.
 */

import { ReactElement } from "react";



export default function Create() : ReactElement {
    return(<div>
        <h1>Create New Item</h1>


        <form>
            <input type="text" name="name" />
            <input type="file" name="image" />

            <input type="submit" value="Create Item" />
        </form>
    </div>);
}

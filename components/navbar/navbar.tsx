import path from "path";
import { ReactElement } from "react";



export default function Navbar() : ReactElement {
    const base = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/background-images-storage/" : ""
    const links = {
        home: path.join(base, "/"),
        post: path.join(base, "/post")
    }



    return(<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href={links.home} className="flex items-center space-x-3 rtl:space-x-reverse">
                <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</h1>
            </a>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a href={links.post} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Post</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)
}

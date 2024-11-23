"use client";
import SpinningWheel from "@/components/loadingbars/spinning";
import { ReactElement, useState } from "react";



/// Explore Page
export default function Explore() : ReactElement {
    const [ loading, setLoading ] = useState<boolean>(true);



    return(<div>
        {loading && <SpinningWheel />}
    </div>);
}

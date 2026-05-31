import {Search} from "lucide-react";

export default function SearchBar() {
    return (
        <div className={"flex flex-row gap-2 justify-center items-center w-1/2 p-2 rounded-4xl border-2 shadow-2xl border-gray-400/50 px-4 hover:border-gray-600 hover:scale-102 transition-all"}>
            <Search/>
            <input type="text" placeholder="Search" className={"w-full border-none outline-none focus:outline-none bg-transparent"}/>
        </div>
    )
}
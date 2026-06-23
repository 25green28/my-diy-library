import {Search} from "lucide-react";
import {useState} from "react";

export default function SearchBar({ onSearch }: {onSearch: (key: string) => void}) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value);
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-row gap-2 justify-center items-center w-9/10 lg:w-1/2 p-2 rounded-4xl border-2 shadow-2xl border-gray-400/50 px-4 hover:border-gray-600 hover:scale-102 transition-all"}>
            <Search/>
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={"w-full border-none outline-none focus:outline-none bg-transparent"}/>
        </form>
    )
}
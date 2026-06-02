import {BookOpen, Plus} from "lucide-react";
import {useBookModalStore} from "@/components/dialog/bookModal.ts";
import {Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    const isLearningMode = location.pathname === "/learning";

    return (
        <div className={"p-10 w-full flex flex-row justify-between bg-white"}>
            <div className={"flex flex-row gap-2 justify-center items-center"}>
                <BookOpen size={28}/>
                <h1 className={"text-2xl"}>My Library</h1>
            </div>
            <div className={"flex flex-row gap-10"}>
                <Link
                    className={"text-xl hover:underline hover:scale-105 hover:text-gray-900/90 transition-all duration-300"}
                    to={isLearningMode ? "/" : "/learning"}
                >
                    {isLearningMode ? "App" : "Learning"}
                </Link>
                {!isLearningMode &&
                    <button className={"flex flex-row bg-transparent items-center gap-2 px-4 py-1 border-2 rounded-4xl border-lime-600 text-green-700 group hover:bg-green-50 hover:scale-105 transition-all duration-300 cursor-pointer"}
                        onClick={() => useBookModalStore.getState().open({mode: "new"})}>
                        <div className={"group-hover:rotate-180 transition-transform duration-300"}>
                            <Plus/>
                        </div>
                        Add a new book
                    </button>
                }
            </div>
        </div>
    )
}
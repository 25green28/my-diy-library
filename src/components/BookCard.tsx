import {useBookModalStore} from "@/components/dialog/bookModal.ts";
import type {Book} from "@/models/Book.ts";

export default function BookCard({book}: {book:Book}) {

    return (
        <button className={"flex flex-col justify-center items-start bg-white rounded-2xl w-fit pb-4 hover:bg-gray-100 shadow-2xl group hover:scale-105 transition-transform duration-300 cursor-pointer"}
        onClick={() => {useBookModalStore.getState().open({mode: "edit", book})}}>
            <div className={"w-60 h-80 bg-blue-300 rounded-t-2xl group-hover:bg-blue-900/80 transition-colors duration-300"}>

            </div>
            <div className={"flex flex-col gap-2 pt-4 px-4"}>
                <div className={"bg-yellow-200/60 p-1 w-fit h-fit rounded-sm"}>
                    <p className={"text-sm"}>{book.genre}</p>
                </div>
                <h2 className={"text-2xl"}>{book.title}</h2>
                <p className={"text-sm italic"}>{book.author}, {book.year}</p>
            </div>
        </button>
    )
}
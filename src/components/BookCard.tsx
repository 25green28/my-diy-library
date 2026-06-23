import {useBookModalStore} from "@/components/dialog/bookModal.ts";
import type {Book} from "@/models/Book.ts";
import {useEffect, useState} from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {Trash} from "lucide-react";

interface BookCardProps {
    book: Book;
    removeBook: (id: string) => void;
    onBookUpdated?: (book: Book) => void;
}

export default function BookCard({book, removeBook, onBookUpdated}: BookCardProps) {
    const open = useBookModalStore(state => state.open);
    const [image, setImage] = useState<string | null>(null);

    const fetchImage = async () => {
        const res = await fetch(`/api/books/${book.id}/image`);
        if (res.ok) {
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImage(imageObjectURL);
        }
    }

    useEffect(() => {
        fetchImage();
    }, [book]);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <button className={"flex flex-col justify-center items-start bg-white rounded-2xl w-fit pb-4 hover:bg-gray-100 shadow-2xl group hover:scale-105 transition-transform duration-300 cursor-pointer"}
                onClick={() => {open({mode: "edit", book}, undefined, onBookUpdated)}}>
                    <div className={"w-60 h-80 bg-blue-300 rounded-t-2xl group-hover:bg-blue-900/80 transition-colors duration-300"}>
                        {image && image.length > 0 && <img src={image} className={"w-full h-full rounded-t-2xl object-cover"}/>}
                    </div>
                    <div className={"flex flex-col gap-2 pt-4 px-4"}>
                        <div className={"bg-yellow-200/60 p-1 w-fit h-fit rounded-sm"}>
                            <p className={"text-sm"}>{book.genre}</p>
                        </div>
                        <h2 className={"text-left px-4 w-full text-2xl"}>{book.title}</h2>
                        <p className={"text-left px-4 w-full text-sm italic"}>{book.author}, {book.published_year}</p>
                    </div>
                </button>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem variant="destructive" onSelect={() => {removeBook(book.id)}}><Trash/> Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
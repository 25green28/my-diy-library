import {useRef} from "react";
import BookDialog from "@/components/dialog/BookDialog.tsx";
import Header from "@/components/Header.tsx";
import BooksWidget, {type BooksWidgetRef} from "@/components/BooksWidget.tsx";
import {useBookModalStore} from "@/components/dialog/bookModal.ts";
import type {Book} from "@/models/Book.ts";

export default function Home() {
    const { payload } = useBookModalStore();

    const booksWidgetRef = useRef<BooksWidgetRef>(null);

    const handleBookCreated = (book: Book) => {
        booksWidgetRef.current?.addBook(book);
    };

    const handleBookUpdated = (book: Book) => {
        booksWidgetRef.current?.updateBook(book);
    };

    return (
        <div className={"min-h-screen flex flex-col"}>
            <BookDialog
                key={payload?.mode === "edit" ? `edit-${payload.book.id}` : `create`}
                onBookCreated={handleBookCreated}
                onBookUpdated={handleBookUpdated}
            />
            <Header onBookCreated={handleBookCreated} />
            <BooksWidget ref={booksWidgetRef}/>
        </div>
    )
}
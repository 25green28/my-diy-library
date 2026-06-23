import {useRef} from "react";
import BookDialog from "@/components/dialog/BookDialog.tsx";
import Header from "@/components/Header.tsx";
import BooksWidget, {type BooksWidgetRef} from "@/components/BooksWidget.tsx";

export default function Home() {
    const booksWidgetRef = useRef<BooksWidgetRef>(null);

    const handleBookCreated = (book: any) => {
        booksWidgetRef.current?.addBook(book);
    };

    const handleBookUpdated = (book: any) => {
        booksWidgetRef.current?.updateBook(book);
    };

    return (
        <div className={"min-h-screen flex flex-col"}>
            <BookDialog onBookCreated={handleBookCreated} onBookUpdated={handleBookUpdated}/>
            <Header onBookCreated={handleBookCreated} onBookUpdated={handleBookUpdated}></Header>
            <BooksWidget ref={booksWidgetRef}/>
        </div>
    )
}
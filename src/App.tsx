import './App.css'
import Header from "./components/Header.tsx";
import BookCard from "./components/BookCard.tsx";
import SearchBar from "./components/SearchBar.tsx";
import BookDialog from "@/components/dialog/BookDialog.tsx";
import type {Book} from "@/models/Book";
import {BOOK_GENRES} from "@/assets/bookGeneres.ts";

const books:Book[] = [
    {
        id: "1",
        title: "Book 1",
        author: "Author 1",
        genre: BOOK_GENRES[0].value,
        year: 2020
    },
    {
        id: "2",
        title: "Book 2",
        author: "Author 2",
        genre: BOOK_GENRES[1].value,
        year: 2021
    },
    {
        id: "3",
        title: "Book 3",
        author: "Author 3",
        genre: BOOK_GENRES[2].value,
        year: 2022
    },
    {
        id: "4",
        title: "Book 4",
        author: "Author 4",
        genre: BOOK_GENRES[3].value,
        year: 2023
    }
]

function App() {
    return (
        <>
            <BookDialog/>
            <div className={"font-family-nunito"}>
                <Header></Header>
                <div className={"bg-mist-50 p-10 flex flex-col justify-center items-center gap-10"}>
                    <SearchBar/>
                    <div className={"flex flex-row gap-4 justify-center"}>
                        {books.map(book => <BookCard book={book} key={book.id}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App

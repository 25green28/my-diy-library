import SearchBar from "@/components/SearchBar.tsx";
import BookCard from "@/components/BookCard.tsx";
import type {Book} from "@/models/Book.ts";
import {useEffect, useState, useImperativeHandle, forwardRef} from "react";
import {useSearchParams} from "react-router-dom";

export interface BooksWidgetRef {
    addBook: (newBook: Book) => void;
    updateBook: (updatedBook: Book) => void;
}

const BooksWidget = forwardRef<BooksWidgetRef>((_props, ref) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKey, setSearchKey] = useState(searchParams.get('q') || '');

    const fetchBooks = async (isSearch: boolean) => {
        const url = isSearch ? `/api/books/search?q=${encodeURIComponent(searchKey)}` : `/api/books`;
        await fetch(url)
            .then(res => {
                if (res.status == 502) {
                    throw new Error('Bad Gateway (502) - The server may by offline')
                }

                if (res.status == 404 && isSearch) {
                    setBooks([]);
                    setLoading(false);
                    return null;
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                return res.json()
            })
            .then(data => {
                if (data) {
                    setBooks(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {
        if (searchKey) {
            setSearchParams({ q: searchKey });
            fetchBooks(true);
        } else {
            setSearchParams();
            fetchBooks(false);
        }
    }, [searchKey, setSearchParams]);

    const searchForBooks = (key: string) => {
        setSearchKey(key);
    }

    const removeBook = async (id: string) => {
        await fetch(`/api/books/${id}`, {method: "DELETE"})
            .then((res) => {
                if (res.ok) {
                    setBooks(books.filter(book => book.id !== id));
                }
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    const addBook = (newBook: Book) => {
        if (searchKey) {
            const searchLower = searchKey.toLowerCase();
            const matchesSearch = 
                newBook.title?.toLowerCase().includes(searchLower) ||
                newBook.author?.toLowerCase().includes(searchLower) ||
                newBook.genre?.toLowerCase().includes(searchLower);
            
            if (matchesSearch) {
                setBooks([newBook, ...books]);
            }
        } else {
            setBooks([newBook, ...books]);
        }
    }

    const updateBook = (updatedBook: Book) => {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    }

    useImperativeHandle(ref, () => ({
        addBook,
        updateBook
    }));

    if (loading) return <div className={"text-center flex justify-center items-center flex-1"}>Loading...</div>
    if (error) return <div className={"text-orange-500 text-center flex justify-center items-center flex-1"}>Error: {error}</div>

    return (
        <div className={"flex-1 bg-mist-50 p-10 flex flex-col items-center gap-10"}>
            <SearchBar onSearch={searchForBooks}/>
            {books.length === 0 && searchKey && (
                <div className={"text-gray-500 text-center"}>No books found matching "{searchKey}"</div>
            )}
            <div className={"flex flex-row gap-4 justify-center flex-wrap gap-10"}>
                {books.length === 0 && !searchKey && (
                    <div className={"text-gray-500 text-center"}>No books found</div>
                )}
                {books.map(book => <BookCard book={book} key={book.id} removeBook={removeBook}/>)}
            </div>
        </div>
    )
});

export default BooksWidget;
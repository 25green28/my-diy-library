import { create } from "zustand";
import type {Book} from "@/models/Book.ts";

type BookDialogPayload =
    | { mode: "new" }
    | { mode: "edit"; book: Book };

type BookModalState = {
    isOpen: boolean;
    payload?: BookDialogPayload;
    onBookCreated?: (book: Book) => void;
    onBookUpdated?: (book: Book) => void;

    open: (payload: BookDialogPayload, onBookCreated?: (book: Book) => void, onBookUpdated?: (book: Book) => void) => void;
    close: () => void;
};

export const useBookModalStore = create<BookModalState>((set) => ({
    isOpen: false,
    payload: undefined,
    onBookCreated: undefined,
    onBookUpdated: undefined,

    open: (payload, onBookCreated, onBookUpdated) =>
        set({
            isOpen: true,
            payload,
            onBookCreated,
            onBookUpdated
        }),
    close: () =>
        set({
            isOpen: false,
            onBookCreated: undefined,
            onBookUpdated: undefined
        }),
}));
import { create } from "zustand";
import type {Book} from "@/models/Book.ts";

type BookDialogPayload =
    | { mode: "new" }
    | { mode: "edit"; book: Book };

type BookModalState = {
    isOpen: boolean;
    payload?: BookDialogPayload;

    open: (payload: BookDialogPayload) => void;
    close: () => void;
};

export const useBookModalStore = create<BookModalState>((set) => ({
    isOpen: false,
    payload: undefined,

    open: (payload) =>
        set({
            isOpen: true ,
            payload
        }),
    close: () =>
        set({
            isOpen: false,
            payload: undefined
        }),
}));
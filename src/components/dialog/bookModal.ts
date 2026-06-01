import { create } from "zustand";

type BookModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useBookModalStore = create<BookModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
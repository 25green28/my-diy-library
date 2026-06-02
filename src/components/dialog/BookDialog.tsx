import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";

import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

import {useBookModalStore} from "@/components/dialog/bookModal.ts";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {BOOK_GENRES} from "@/assets/bookGeneres.ts";

export default function BookDialog() {
    const { isOpen, close, payload } = useBookModalStore();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isEditMode = payload?.mode === "edit";
    const bookToEdit = payload?.mode === "edit" ? payload.book : undefined;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
            setImagePreview(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new book</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor={"bookImage"}>
                            Book cover image
                        </FieldLabel>
                        <div className="flex flex-col gap-2 items-center">
                            <Input
                                id={"bookImage"}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {!selectedImage && (
                                <label
                                    htmlFor="bookImage"
                                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Choose file
                                </label>
                            )}
                            {imagePreview && (
                                <div className="relative w-32 h-48 mt-2 cursor-pointer" onClick={() => document.getElementById('bookImage')?.click()}>
                                    <img
                                        src={imagePreview}
                                        alt="Book cover preview"
                                        className="w-full h-full object-cover rounded-md border hover:opacity-80 transition-opacity"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"bookTitle"}>
                            Book title
                        </FieldLabel>
                        <Input
                            id={"bookTitle"}
                            placeholder="Programming in Python"
                            defaultValue={bookToEdit?.title}
                            required={true}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"bookAuthor"}>
                            Author name
                        </FieldLabel>
                        <Input
                            id={"bookAuthor"}
                            placeholder="Mateusz Laski"
                            defaultValue={bookToEdit?.author}
                            required={true}
                        />
                    </Field>
                    <div className={"flex flex-row gap-4"}>
                        <Field className={"flex-2"}>
                            <FieldLabel htmlFor={"bookGenre"}>
                                Book Genre
                            </FieldLabel>
                            <Select defaultValue={bookToEdit?.genre}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a genre"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {BOOK_GENRES.map((genre) => (
                                        <SelectItem key={genre.value} value={genre.value}>
                                            {genre.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field className={"flex-1"}>
                            <FieldLabel htmlFor={"bookYear"}>Year</FieldLabel>
                            <Input
                                id={"bookYear"}
                                placeholder="2026"
                                required
                                defaultValue={bookToEdit?.year}
                            />
                        </Field>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                        <Button className={"flex-2"} type={"submit"}>{isEditMode ? "Update" : "Create"}</Button>
                        <Button className={"flex-1"}>Cancel</Button>
                    </div>
                </FieldGroup>
            </DialogContent>
        </Dialog>
    )
}
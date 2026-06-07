import type { IconName } from "lucide-react/dynamic";

export type category = {
    id: number,
    title: string,
    icon: IconName,
    lessons: lesson[]
}

export type lesson = {
    id: number,
    title: string,
    path: string
}

export type currentLesson = {
    parentCategory: number,
    data: lesson
}
"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.tsx"
import { DynamicIcon } from "lucide-react/dynamic";
import type {category, currentLesson} from "@/assets/lessons/lessonObjects.ts";

export function NavMain({
                            items,
                            setLesson,
                            currentLesson,
                            currentLanguage
                        }: {
    items: category[],
    setLesson: (
        category: number,
        lesson: number
    ) => void,
    currentLesson: currentLesson | undefined,
    currentLanguage: string | undefined
}) {
    const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())

    // Automatically update open categories when current lesson changes
    useEffect(() => {
        if (currentLesson !== undefined) {
            setOpenCategories(new Set([currentLesson.parentCategory]))
        }
    }, [currentLesson])

    const isCategoryOpen = (categoryId: number) => {
        if (currentLesson?.parentCategory === categoryId) return true
        return openCategories.has(categoryId)
    }

    const toggleCategory = (categoryId: number, isOpen: boolean) => {
        setOpenCategories(prev => {
            const next = new Set(prev)
            if (isOpen) {
                next.add(categoryId)
            } else {
                next.delete(categoryId)
            }
            return next
        })
    }

    const getLocalizedTitle = (item: category | { title: string, titles?: {[lang:string]:string}}) => {
        if (currentLanguage && item.titles && item.titles[currentLanguage])
            return item.titles[currentLanguage]
        return item.title
    }

    const getLocalizedSubTitle = (subItem: category | { title: string, titles?: {[lang:string]:string}}) => {
        if (currentLanguage && subItem.titles && subItem.titles[currentLanguage])
            return subItem.titles[currentLanguage]
        return subItem.title
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>DIY library app</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        open={isCategoryOpen(item.id)}
                        onOpenChange={(open) => toggleCategory(item.id, open)}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={getLocalizedTitle(item)}>
                                    {/*{item.icon && <item.icon />}*/}
                                    {item.icon && <DynamicIcon name={item.icon}/>}
                                    <span>{getLocalizedTitle(item)}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.lessons?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild isActive={currentLesson?.parentCategory === item.id && currentLesson?.data.id === subItem.id}>
                                                <button onClick={() => setLesson(item.id, subItem.id)}>
                                                    <span className={"truncate"}>{getLocalizedSubTitle(subItem)}</span>
                                                </button>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

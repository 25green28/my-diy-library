"use client"

import { useState } from "react"
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
                            currentLesson
                        }: {
    items: category[],
    setLesson: (
        category: number,
        lesson: number
    ) => void,
    currentLesson: currentLesson | undefined
}) {
    const [openCategories, setOpenCategories] = useState<Set<number>>(new Set())

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
                                <SidebarMenuButton tooltip={item.title}>
                                    {/*{item.icon && <item.icon />}*/}
                                    {item.icon && <DynamicIcon name={item.icon}/>}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.lessons?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild isActive={currentLesson?.parentCategory === item.id && currentLesson?.data.id === subItem.id}>
                                                <button onClick={() => setLesson(item.id, subItem.id)}>
                                                    {subItem.title}
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

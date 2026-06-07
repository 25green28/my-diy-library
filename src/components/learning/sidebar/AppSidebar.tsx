import {
    Sidebar,
    SidebarContent, SidebarFooter
} from "@/components/ui/sidebar.tsx"
import {NavMain} from "@/components/learning/sidebar/navMain.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {NavFooter} from "@/components/learning/sidebar/navFooter.tsx";
import type {category, currentLesson} from "@/assets/lessons/lessonObjects.ts";

export default function AppSidebar({
                                       setLesson,
                                       typedCategories,
                                       currentLesson
    }: {
        setLesson: (category: number, lesson: number) => void,
        typedCategories: category[],
        currentLesson: currentLesson | undefined
    }){
    return (
        <TooltipProvider>
            <Sidebar collapsible={"icon"}>
                <SidebarContent>
                    <NavMain items={typedCategories} setLesson={setLesson} currentLesson={currentLesson}/>
                </SidebarContent>
                <SidebarFooter>
                    <NavFooter/>
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}
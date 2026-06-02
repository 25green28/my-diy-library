import {
    Sidebar,
    SidebarContent, SidebarFooter
} from "@/components/ui/sidebar.tsx"
import {Bot, SquareTerminal} from "lucide-react";
import {NavMain} from "@/components/learning/sidebar/navMain.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {NavFooter} from "@/components/learning/sidebar/navFooter.tsx";

const data = [
    {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "History",
                url: "#",
            },
            {
                title: "Starred",
                url: "#",
            },
            {
                title: "Settings",
                url: "#",
            },
        ],
    },
    {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Genesis",
                url: "#",
            },
            {
                title: "Explorer",
                url: "#",
            },
            {
                title: "Quantum",
                url: "#",
            },
        ],
    }
]

export default function AppSidebar() {
    return (
        <TooltipProvider>
            <Sidebar collapsible={"icon"}>
                <SidebarContent>
                    <NavMain items={data}/>
                </SidebarContent>
                <SidebarFooter>
                    <NavFooter/>
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}
import {useSidebar} from "@/components/ui/sidebar.tsx";
import {SidebarMenu, SidebarMenuItem, SidebarMenuButton} from "@/components/ui/sidebar.tsx";
import { PanelsTopLeft} from "lucide-react";
import {Link} from "react-router-dom";

export function NavFooter() {
    const { state } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to="/">
                        <PanelsTopLeft />
                        {state === "expanded" && <span>Go to application</span>}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
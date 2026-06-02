import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/learning/sidebar/AppSidebar.tsx";

export default function Learning() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main>
                    <SidebarTrigger/>
                    <h1>Learning</h1>
                </main>
            </SidebarProvider>
        </>
    )
}
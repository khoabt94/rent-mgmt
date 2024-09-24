import { Sheet } from "@/components/ui/sheet"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { useState } from "react"
import { useAuthStore } from "@/store"

export function Header() {
    const [open, setOpen] = useState(false)
    const { user } = useAuthStore()
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Navbar />
            {user ? (<Sidebar closeNavbar={() => setOpen(false)} />) : <></>}

        </Sheet >
    )
}

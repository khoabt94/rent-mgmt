import { SheetTrigger } from "@/components/ui/sheet"
// import { useAuthStore } from "@/store"
import { cn } from "@/utils/tailwind"
import { AlignJustify } from "lucide-react"
// import { useMemo } from "react"
// import { useLocation } from "react-router-dom"

// const pathToHideCreateTodoBtn = [
//   '/timeline'
// ]

export default function Navbar() {
  // const location = useLocation()
  // const { user } = useAuthStore()


  // const shouldHideBtn = useMemo(() => {
  //   return pathToHideCreateTodoBtn.some(path => location.pathname.includes(path))
  // }, [location.pathname])

  return (
    <div className={cn('flex px-4 h-[60px] py-2 w-full justify-between items-center transition-all border-b-[1px] border-b-gray-600 fixed top-0 backdrop-blur-xl z-50')}>
      {/* {user ? (<SheetTrigger>
        <AlignJustify />
      </SheetTrigger>) : null} */}
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <img src="/public/logo.png" alt="logo" className="h-10 w-fit mx-auto" />


    </div>
  )
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import { siteConfig } from '@/configs/site'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  closeNavbar: () => void
}

export default function Sidebar({ closeNavbar }: Props) {
  const openCreateProjectDrawer = () => {
    closeNavbar()
  }
  const openLogoutConfirm = () => {
    closeNavbar()
  }
  return (
    <SheetContent
      side="left"
      className='flex flex-col'
    >
      <SheetHeader className="flex justify-center">
        <img src="/public/logo.png" alt="logo" className="h-10 w-fit block mx-auto" />
      </SheetHeader>

      <Accordion type="single" collapsible className="w-full">

        <AccordionItem value="projects" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Khu nhà
              </p>
              <Button
                type="button"
                variant={"ghost"}
                className='px-2'
                onClick={openCreateProjectDrawer}
              >
                <Plus />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-y-4 flex-col px-4">
              <p>Khu nhà 92 VDPT</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Cài đặt tài khoản
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-y-6 px-4 mt-3'>
              <Link to={siteConfig.paths.accountInfo()}>Thông tin</Link>
              <Link to={siteConfig.paths.accountPassword()}>Đổi mật khẩu</Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Button className='w-full mt-auto' onClick={openLogoutConfirm}>
        Đăng xuất
      </Button>
    </SheetContent >
  )
}

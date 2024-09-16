import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import { siteConfig } from '@/configs/site'
import { useOpenModal } from '@/hooks/utils/use-open-modal'
import { CreateEditAreaDrawer } from '@/lib/area/drawer'
import { AreaList } from '@/lib/area/list'
import { Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  closeNavbar: () => void
}

export default function Sidebar({ closeNavbar }: Props) {
  const { open } = useOpenModal()
  const navigate = useNavigate()
  const openCreateAreaDrawer = () => {
    open(CreateEditAreaDrawer, {})
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

        <AccordionItem value="areas" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Khu nhà
              </p>
              <Button
                type="button"
                variant={"ghost"}
                className='px-2'
                onClick={openCreateAreaDrawer}
              >
                <Plus />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AreaList onClick={closeNavbar} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rentee" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3" showIcon={false} onClick={() => {
            navigate(siteConfig.paths.rentee())
            closeNavbar()
          }}>
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Người thuê
              </p>
            </div>
          </AccordionTrigger>
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

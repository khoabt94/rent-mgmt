import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import { Area } from '@/interfaces'
import { Pencil } from 'lucide-react'
import { NavLink } from 'react-router-dom'

type Props = {
  area: Area.Detail
  onClick: () => void
  onClickEdit: (_area: Area.Detail) => void
}

export function AreaItem({ area, onClickEdit, onClick }: Props) {

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-medium bg-slate-100" : "bg-white"
      }
      to={siteConfig.paths.area(area._id)}
      onClick={onClick}
    >
      <div
        className='w-full px-4 py-2 rounded-lg shadow border border-gray-200 flex justify-between items-center'
      >
        <p className=''>
          {area.area_name}
        </p>
        {/* <MenuActions area={area} onClick={onClick} /> */}
        <Button
          type="button"
          variant={"ghost"}
          className='flex flex-row gap-x-3 opacity-80'
          onClick={() => onClickEdit(area)}
        >
          <Pencil size={20} strokeWidth={1.5} />
        </Button>
      </div>
    </NavLink>
  )
}
